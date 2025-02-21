// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {
        fontFamily: {},
        keyframes: {}
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      require('flowbite/plugin')
    ],
  };