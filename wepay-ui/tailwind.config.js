/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      vs: '280px',
      xs:'375px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors:{
        bgColor:'rgba(217, 217, 217, 0.33)',
        textColor:'#161616',
        textColor2:'white',
        effectColor:'#3fb37f',
        gradientFrom:'#258A25',
        gradientTo:'#3fb37f',
      },
      boxShadow: {
        'bgShadow':"inset 0px 4px 150px rgba(0, 0, 0, 0.25)",
        'cardShadow':"0px 4px 83px rgba(0, 0, 0, 0.25)",
        'mapShadow': "inset 0px 0px 16px 6px rgba(0,0,0,0.10)",
        'darkMapShadow' : "inset 0px 0px 16px 6px rgba(255,255,255,0.10)",
      }
    },
  },
  plugins: [],
}
