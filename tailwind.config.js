/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      screens: {
        'xs': '579px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Добавляем новый брекпоинт
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },

      colors: {
        redSection: "#DC2626;",
        violetSection: "#853bce;",
        greenSection: "#42946e;",
        blueSection: "#306ee8;",
        dodgergreen: "#1c362a;",
        dodgerblue: "#1e90ff;",
        darkNavy: "#0a0f0d",
        vibrantTeal: "#14b9d5",
        electricBlue: "#0078d4",
        cerulean: "#2a9df4",
        mutedSlate: "#2d3e50",
        softCyan: "#88d8f7",
        metalicSilver: "#b4b8bd",
        deepSky: "#0193ff",
        midnightBlue: "#02091c",
        royalBlueDark: "#003465",
        darkSapphire: "#0a294a",
        vividSkyBlue: "#0281e0",
        steelBlue: "#1e6dc2",
        turquoiseBlue: "#3bebf0",
        deepMagenta: "#a0296c",
        brightSkyBlue: "#00a7fe",
        cornflowerBlue: "#0185e1",
        lavenderIndigo: "#d875f1",
        darkCornflowerBlue: "#226ab8",
        jadeGreen: "#42936d",
        azureRadiance: "#306de8",
        mediumPurple: "#843bce",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(100px, 1fr))",
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fit-200": "repeat(auto-fit, minmax(200px, 1fr))",
        "repeat-3": "repeat(3, minmax(220px, 250px))",
        "repeat-4": "repeat(4, minmax(200px, 250px))",
        "repeat-2": "repeat(2, minmax(220px, 250px))",
        "repeat-1": "repeat(1, minmax(220px, 1fr))",
      },
      gridTemplateRows: {
        "repeat-1": "repeat(auto-fill, minmax(100px, 300px))",
      },
    },
  },
  plugins: [],
};
