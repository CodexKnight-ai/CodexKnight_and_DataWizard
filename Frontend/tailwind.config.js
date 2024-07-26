/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gtaDescriptionText : ['Poppins'],
        gtaHeadingText1    : ['Pricedown'],
        gtaHeadingText2    : ['Exo']
      },
      colors :{
        "dblue"    : "var(--dblue)"  ,
        "whitish"  : "var(--whitish)",
        "blackish" : "var(--blackish)",
        "redish" : "var(--redish)",
      },
      boxShadow: {
        'inset': 'inset 2px 2px 5px  rgba(0,0,0,0.3);',
      }
    },
    
  },
  plugins: [],
}

