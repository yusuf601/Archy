/** @type {import('tailwindcss').Config} */
const compilerColor = (token) => `rgb(var(${token}-rgb) / <alpha-value>)`;

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-body': compilerColor('--bg-body'),
                'bg-navbar': compilerColor('--bg-navbar'),
                'bg-panel': compilerColor('--bg-panel'),
                'bg-panel-hover': compilerColor('--bg-panel-hover'),
                'bg-terminal': compilerColor('--bg-terminal'),

                'text-primary': compilerColor('--text-primary'),
                'text-secondary': compilerColor('--text-secondary'),
                'text-muted': compilerColor('--text-muted'),

                'accent-success': compilerColor('--accent-success'),
                'accent-info': compilerColor('--accent-info'),
                'accent-warning': compilerColor('--accent-warning'),
                'accent-danger': compilerColor('--accent-danger'),

                'border-light': compilerColor('--border-light'),
                'border-strong': compilerColor('--border-strong'),

                'accent-blue': compilerColor('--accent-info'),
                'accent-green': compilerColor('--accent-success'),

                'everblush-bg': compilerColor('--bg-body'),
                'everblush-bg-light': compilerColor('--bg-panel'),
                'everblush-fg': compilerColor('--text-primary'),
                'everblush-grey': compilerColor('--text-muted'),
                'everblush-green': compilerColor('--accent-success'),
                'everblush-blue': compilerColor('--accent-info'),
                'everblush-yellow': compilerColor('--accent-warning'),
                'everblush-red': compilerColor('--accent-danger'),
                'everblush-cyan': compilerColor('--accent-info'),
                'everblush-magenta': compilerColor('--accent-danger'),
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                display: ['var(--font-display)'],
                mono: ['var(--font-mono)'],
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
                'glow-green': '0 0 20px rgb(var(--accent-success-rgb) / 0.3)',
                'glow-green-lg': '0 0 30px rgb(var(--accent-success-rgb) / 0.45)',
                'glow-blue': '0 0 20px rgba(108, 142, 212, 0.3)',
                'glow-blue-lg': '0 0 30px rgba(108, 142, 212, 0.5)',
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'marquee': 'marquee 30s linear infinite',
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
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
