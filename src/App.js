import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('PLN');
  const [to, setTo] = useState('CZK');
  const [exchange, setExchange] = useState('');
  const [error, setError] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(
    function () {
      async function getCurrency() {
        try {
          // Checking the validity of the input value
          if (!amount || isNaN(amount) || amount <= 0) {
            setInputError('Invalid amount.');
            throw new Error('Invalid amount.');
          }

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );
          if (!res.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await res.json();

          // Validation of API data
          if (!data || !data.rates || !data.rates[to]) {
            throw new Error('Invalid response format from API.');
          }
          setExchange(data.rates[to]);
          setInputError('');
          setError('');
        } catch (error) {
          // Error handling
          console.error('Error fetching data:', error.message);
          if (inputError) {
            setError('');
          } else {
            setError('Something went wrong, please try again later.');
          }
          setExchange('');
        }
      }

      if (from === to) return setExchange(amount);

      getCurrency();
    },
    [amount, from, to, inputError]
  );

  return (
    <div className="min-h-screen grid place-content-center">
      <main className="max-w-md p-8 rounded-lg">
        <h1 className="text-center text-xl mb-4 font-semibold">
          Currency Converter
        </h1>
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setInputError('');
          }}
          className="w-full p-2 rounded-md focus:outline-0 mb-4 text-center border focus:border-neutral-500"
        />
        {inputError && (
          <p className="text-center text-red-500 mb-4">{inputError}</p>
        )}
        <div className="flex gap-4 mb-4">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 p-2 rounded-md border focus:outline-0 focus:border-neutral-500">
            <option value="USD">🇺🇸 USD</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="CZK">🇨🇿 CZK</option>
            <option value="PLN">🇵🇱 PLN</option>
            <option value="GBP">🇬🇧 GBP</option>
          </select>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 p-2 rounded-md border focus:outline-0 focus:border-neutral-500">
            <option value="USD">🇺🇸 USD</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="CZK">🇨🇿 CZK</option>
            <option value="PLN">🇵🇱 PLN</option>
            <option value="GBP">🇬🇧 GBP</option>
          </select>
        </div>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <p className="text-center text-lg">
          {amount} {from} is currently {exchange} {to}
        </p>
      </main>
    </div>
  );
}
