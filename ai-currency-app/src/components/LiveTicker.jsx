import { currencies } from "../data/mockData";

export default function LiveTicker() {
  const list = [...currencies, ...currencies];

  return (
    <div className="relative w-full overflow-hidden glass border-y border-cyan-400/20 py-3">
      <div className="flex w-max animate-ticker">
        {list.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 text-sm text-gray-300 whitespace-nowrap"
          >
            <img
              src={`https://flagcdn.com/w40/${c.flagCode}.png`}
              alt={c.code}
              className="w-5 h-5 rounded-full object-cover border border-white/10"
            />
            <span className="font-semibold text-white">{c.code}</span>
            <span className="text-cyan-400">{c.rate.toFixed(2)}</span>
            <span className="text-emerald-400 text-xs">▲ 0.0{i % 5}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}