/** @type {import('twind').Configuration} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Averta', 'sans-serif'],
        extrabold: ['Averta Bold', 'sans-serif'],
      },
      colors: {
        "sapien": "#6200EA",
        "sapien-80": "#8133EE",
        "sapien-60": "#A166F2",
        "sapien-40": "#C099F7",
        "sapien-20": "#E0CCFB",
        "sapien-pink": "#FF4279",
        "sapien-pink-80": "#FF6894",
        "sapien-pink-60": "#FF8EAF",
        "sapien-pink-40": "#FFB3C9",
        "sapien-pink-20": "#FFD9E4",
        "sapien-green": "#8BC95A",
        "sapien-green-80": "#A2D47B",
        "sapien-green-60": "#B9DF9C",
        "sapien-green-40": "#D1E9BD",
        "sapien-green-20": "#E8F4DE",
        "sapien-blue": "#14C4D7",
        "sapien-blue-80": "#43CFDF",
        "sapien-blue-60": "#72DBE7",
        "sapien-blue-40": "#A1E7EF",
        "sapien-blue-20": "#D0F3F7",
        "sapien-orange": "#FF9459",
        "sapien-orange-80": "#FFA97A",
        "sapien-orange-60": "#FFBF9B",
        "sapien-orange-40": "#FFD4BD",
        "sapien-orange-20": "#FFEADE",
      },
      screens: {
        standalone: { raw: '(display-mode:standalone)' },
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      }
    },
  },
};
