// Import the necessary module
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Spread the content array from Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), flowbite.plugin()],
};
