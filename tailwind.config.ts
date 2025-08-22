import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'Text': {
          primary: '#4E4E4E',
          secondary: '#999999',
        },
        'Fill': {
          background: '#E8E7E5',
          letter: '#FFFFFF',
          input: '#EDECEA',
        },
        'Stroke': {
          input: '#D1D0CD',
          letter: '#F2F2F2', 
          separator: '#DCDCDC',
          button: '#908E8B',
        },
      },
      fontFamily: {
        'marist': ['ABC Marist Variable', 'sans-serif'],
        'marist-unlicensed': ['ABC Marist Unlicensed Trial', 'serif'],
      },
      boxShadow: {
        'letter': '0px 2px 4px 0px rgba(0,0,0,0.05), 0px 7px 7px 0px rgba(0,0,0,0.04), 0px 16px 10px 0px rgba(0,0,0,0.03), 0px 29px 11px 0px rgba(0,0,0,0.01), 0px 45px 12px 0px rgba(0,0,0,0.00)',
      },
      borderRadius: {
        'lg': '8px',
        'letter': '4px',
      },
    },
  },
  plugins: [],
} satisfies Config;