/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          // eslint-disable-next-line no-undef
          ...require('daisyui/src/theming/themes')['light'],
          primary: 'rgb(172, 28, 0)',
          secondary: 'rgb(0, 28, 83)',
          info: 'rgb(48,105,227)'
        },
        dark: {
          // eslint-disable-next-line no-undef
          ...require('daisyui/src/theming/themes')['dark'],
          primary: 'rgb(254,203,69)' /*"rgb(255,255,83)",*/,
          secondary: 'rgb(83,0,0)',
          info: 'rgb(48,105,227)'
        }
      }
    ]
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui')
  ]
}
