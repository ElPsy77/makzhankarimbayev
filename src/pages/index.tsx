import router from 'next/router';
import { ReactElement, useEffect } from 'react';
import Head from 'next/head';

const HomePage = (): ReactElement => {
   useEffect(() => {
      router.replace('/formularz-wadium');
   });

   return (
      <>
         <Head>
            <title>Aspergo</title>
            <meta name='robots' content='noindex,nofollow' />
         </Head>
      </>
   );
};

export default HomePage;
