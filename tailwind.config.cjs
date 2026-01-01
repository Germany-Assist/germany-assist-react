module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030303", // Deepest background
          900: "#0a0a0a", // Section background
          800: "#141414", // Card background
        },
        accent: "#22d3ee", // Electric Cyan
      },
      animation: {
        float: "floating 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
