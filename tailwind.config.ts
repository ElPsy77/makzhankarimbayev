import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      screens: {
         small: '480px',
         medium: '768px',
         large: '976px',
         huge: '1440px',
      },
      colors: {
         white: '#fff',
         black: '#333',
      },
   },
   plugins: [],
};
export default config;
