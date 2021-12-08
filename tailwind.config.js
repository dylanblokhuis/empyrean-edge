module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ["Inter", "sans-serif"]
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
