/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/public/views/**/*.ejs",
    "./src/public/views/**/*.html",
    "./src/public/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
     minHeight: {
         'custom': '80vh',
         }
    },
 },
  plugins: [require("daisyui")],
};