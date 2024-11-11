import router from 'next/router';
import { ReactElement, useEffect } from 'react';

const HomePage = (): ReactElement => {
   useEffect(() => {
      router.replace('/formularz-wadium');
   });

   return <></>;
};

export default HomePage;
