/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(34,211,238,0.6)' },
          '50%': { boxShadow: '0 0 25px rgba(34,211,238,0.9)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        orbit: 'orbit 12s linear infinite',
        orbitReverse: 'orbit 18s linear infinite reverse',
        float: 'float 6s ease-in-out infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        ticker: 'ticker 25s linear infinite',
      },
    },
  },
  plugins: [],
}
