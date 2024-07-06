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
         background: '#f2f2f2',
         white: '#fff',
         black: '#333',
         green: '#053827',
         brown: '#96744e',
         grayLight: '#d9d9d9',
      },
   },
   plugins: [],
};
export default config;
