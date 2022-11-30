/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#16ABF8",
				textGray: "#888888",
				grayLight: "#F4F4F4",
				darkBlack: "#4A4A4A",
				mainRed: "#ED4C5C",
				grayBorder: "#E5E5E5",
				mainOrange: "#F8A541",
				mainGreen: "#00A790",
				blueBadge: "#428BC1",
				purpleBadge: "#8942C1",
			},
		},
	},
	plugins: [],
}
