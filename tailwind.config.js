const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: false,
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 2s linear infinite',
      },
      backgroundImage: {
        mint: "url('https://d1bdmh0gdusw0k.cloudfront.net/images/misc/passport_sapien_nation.png')",
      },
      gridTemplateColumns: {
        'discovery-grid': 'repeat(auto-fill,minmax(248px,1fr))',
      },
      fontFamily: {
        sans: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        primary: '#6200EA',
        'primary-100': '#A68CF1',
        'primary-200': '#A185F2',
        'primary-300': '#8568D9',
        'primary-400': '#755CBF',
        'primary-500': '#6650A6',
        'primary-600': '#56448C',
        'primary-700': '#463773',
        'primary-800': '#36254D',
        'primary-900': '#241933',
        sapien: '#6200EA',
        'sapien-80': '#8133EE',
        'sapien-60': '#A166F2',
        'sapien-40': '#C099F7',
        'sapien-20': '#E0CCFB',
        'sapien-dark-purple': '#2E1247',
        'sapien-pink': '#FF4279',
        'sapien-pink-80': '#FF6894',
        'sapien-pink-60': '#FF8EAF',
        'sapien-pink-40': '#FFB3C9',
        'sapien-pink-20': '#FFD9E4',
        'sapien-green': '#8BC95A',
        'sapien-green-80': '#A2D47B',
        'sapien-green-60': '#B9DF9C',
        'sapien-green-40': '#D1E9BD',
        'sapien-green-20': '#E8F4DE',
        'sapien-blue': '#14C4D7',
        'sapien-blue-80': '#43CFDF',
        'sapien-blue-60': '#72DBE7',
        'sapien-blue-40': '#A1E7EF',
        'sapien-blue-20': '#D0F3F7',
        'sapien-orange': '#FF9459',
        'sapien-orange-80': '#FFA97A',
        'sapien-orange-60': '#FFBF9B',
        'sapien-orange-40': '#FFD4BD',
        'sapien-orange-20': '#FFEADE',
        'sapien-neutral-100': '#7B777D',
        'sapien-neutral-200': '#656067',
        'sapien-neutral-300': '#4F4952',
        'sapien-neutral-400': '#39323C',
        'sapien-neutral-500': '#2C252F',
        'sapien-neutral-600': '#23213b',
        'sapien-neutral-700': '#1E1821',
        'sapien-neutral-800': '#161527',
        'sapien-neutral-900': '#120F14',
        'sapien-red-700': '#FF4279',
      },
      inset: {
        15: '15px',
      },
      height: {
        '35px': '35px',
        150: '150px',
        320: '320px',
        660: '660px',
      },
      minHeight: {
        250: '250px',
        400: '400px',
        '8-75': '8.75rem',
        '64px': '64px',
      },
      minWidth: {
        '16px': '16px',
        '20px': '20px',
        570: '570px',
      },
      maxWidth: {
        250: '250px',
        '1100px': '1100px',
      },
      padding: {
        '1px': '1px',
        52: '52px',
      },
      width: {
        '1px': '1px',
        500: '500px',
        48: '48%',
        '1100px': '1100px',
      },
      rotate: {
        '45deg': '45deg',
      },
      spacing: {
        '12px': '12px',
        '10px': '10px',
      },
      fontSize: {
        '10px': '10px',
      },
    },
  },
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './wallet/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
