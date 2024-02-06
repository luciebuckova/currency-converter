import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmout] = useState(1);
  const [from, setFrom] = useState('PLN');
  const [to, setTo] = useState('CZK');
  const [exchange, setExchange] = useState('');

  useEffect(
    function () {
      async function getCurrency() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setExchange(data.rates[to]);
      }

      if (from === to) return setExchange(amount);

      getCurrency();
    },
    [amount, from, to]
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
          onChange={(e) => setAmout(Number(e.target.value))}
          className="w-full p-2 rounded-md focus:outline-0 mb-4 text-center border focus:border-neutral-500"
        />
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
        <p className="text-center text-lg">
          {amount} {from} is currently {exchange} {to}
        </p>
      </main>
    </div>
  );
}
