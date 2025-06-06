/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          100: '#f7d4b8',
          800: '#232e42',
        },
        teal: {
          100: '#64eafa',
        },
      },
      gridTemplateColumns: {
        // "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        'auto-fit-100': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
};
