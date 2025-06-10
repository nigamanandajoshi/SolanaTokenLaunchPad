// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",

//     // Or if using `src` directory:
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'menu-open': 'menuOpen 0.3s ease-in-out forwards',
        'menu-close': 'menuClose 0.3s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        menuOpen: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
        menuClose: {
          '0%': { maxHeight: '500px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(99, 102, 241, 0.3)',
        'glow-md': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.5)',
        'nav': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function({ addComponents }) {
      addComponents({
        '.nav-link': {
          position: 'relative',
          transition: 'all 0.3s ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '2px',
            background: 'currentColor',
            transition: 'all 0.3s ease',
          },
          '&:hover::after': {
            width: '50%',
          },
        },
        '.navbar': {
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        },
      });
    },
  ],
};