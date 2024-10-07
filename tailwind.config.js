/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'dark',
    theme: {
        extend: {
            colors: {
                primary: '#ffffff', // синий для светлой темы
                secondary: '#000000', // желтый для светлой темы
                // Можно также добавить цвета для темной темы
                dark: {
                    primary: '#000000', // синий для темной темы
                    secondary: '#ffffff', // желтый для темной темы
                },
            },
        },
    },
    plugins: [],
}
