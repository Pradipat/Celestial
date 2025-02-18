/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // ✅ ครอบคลุมไฟล์ใน Next.js (App Router)
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ ถ้าใช้ Page Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

