module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "rgb(var(--app-bg) / <alpha-value>)",
          card: "rgb(var(--app-card) / <alpha-value>)",
          surface: "rgb(var(--app-surface) / <alpha-value>)",
          text: "rgb(var(--app-text) / <alpha-value>)",
          heading: "rgb(var(--app-heading) / <alpha-value>)",
          muted: "rgb(var(--app-muted) / <alpha-value>)",
          border: "rgb(var(--app-border) / <alpha-value>)",
          brand: "rgb(var(--app-brand) / <alpha-value>)",
          primary: "rgb(var(--app-primary) / <alpha-value>)",
          "on-primary": "rgb(var(--app-on-primary) / <alpha-value>)",
          danger: "rgb(var(--app-danger) / <alpha-value>)",
          warning: "rgb(var(--app-warning) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
