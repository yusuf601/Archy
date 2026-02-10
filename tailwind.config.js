/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Everblush Theme Colors
                'everblush-bg': '#141b1e',
                'everblush-fg': '#dadada',
                'everblush-green': '#8ccf7e',
                'everblush-blue': '#6c8ed4',
                'everblush-red': '#e57474',
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
