export const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rate: 1 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: 0.78 },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", rate: 83.12 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rate: 149.5 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rate: 1.52 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rate: 1.36 },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rate: 7.24 },
];

export const chartData = [
  { time: "Mon", rate: 82.9 },
  { time: "Tue", rate: 83.1 },
  { time: "Wed", rate: 82.7 },
  { time: "Thu", rate: 83.4 },
  { time: "Fri", rate: 83.6 },
  { time: "Sat", rate: 83.2 },
  { time: "Sun", rate: 83.12 },
];

export const aiMessages = [
  "📈 USD/INR likely to rise 0.4% in next 48 hours based on bond yield trends.",
  "⚠️ High volatility detected in GBP due to upcoming policy announcement.",
  "💡 Best time to convert EUR→USD: within next 3 hours (rate dip predicted).",
  "🔒 No fraud patterns detected in your last 10 transactions.",
  "🌐 JPY showing bullish momentum — consider holding before converting.",
];

export const transactions = [
  { id: 1, from: "USD", to: "INR", amount: 500, result: 41560, time: "2 min ago" },
  { id: 2, from: "EUR", to: "GBP", amount: 200, result: 169.2, time: "15 min ago" },
  { id: 3, from: "GBP", to: "USD", amount: 150, result: 192.3, time: "1 hr ago" },
  { id: 4, from: "INR", to: "USD", amount: 10000, result: 120.3, time: "3 hr ago" },
];
