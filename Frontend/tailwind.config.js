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
        'inset': 'inset 3px 3px 5px  rgba(0,0,0,0.3);',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1400px',
        // => @media (min-width: 1536px) { ... }

        '3xl': '1600px',
        // => @media (min-width: 1700px) { ... }

        '4xl' : '1800px',
        // => @media (min-width: 1800px) { ... }

        '5xl' : '2000px',
        // => @media (min-width: 1800px) { ... }

        '6xl' : '2200px',
        // => @media (min-width: 1800px) { ... }

        '7xl' : '2400px',
        // => @media (min-width: 1800px) { ... }

      }
    },
    
  },
  plugins: [],
}

