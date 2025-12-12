/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Anton', 'sans-serif'],
                body: ['Oswald', 'sans-serif'],
                graffiti: ['LocalGraffiti', 'cursive'],
            },
            colors: {
                brand: {
                    red: '#D32F2F', // A slightly deeper red, more streetwear
                    black: '#050505',
                    white: '#F5F5F5',
                }
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        },
    },
    plugins: [],
}
