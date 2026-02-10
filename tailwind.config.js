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
                'everblush-grey': '#676f7d',
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '3.75rem',
                '7xl': '4.5rem',
                '8xl': '6rem',
            },
            lineHeight: {
                'relaxed': '1.75',
                'loose': '2',
            },
            boxShadow: {
                'glow-green': '0 0 20px rgba(140, 207, 126, 0.3)',
                'glow-green-lg': '0 0 30px rgba(140, 207, 126, 0.5)',
                'glow-blue': '0 0 20px rgba(108, 142, 212, 0.3)',
                'glow-blue-lg': '0 0 30px rgba(108, 142, 212, 0.5)',
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
