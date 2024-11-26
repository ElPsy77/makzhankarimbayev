import React, { ReactElement } from 'react';
import ContentContainer from '@/components/ContentContainer';
import DepositForm from '@/features/depositForm/components/DepositForm';
import Head from 'next/head';

const DepositFormPage = (): ReactElement => (
   <>
      <Head>
         <title>Aspergo - Formularz Wadium</title>
         <meta name='description' content='Formularz Wadium' />
         <meta name='robots' content='index,follow' />
      </Head>

      <ContentContainer>
         <h1 className='mb-5 text-3xl font-bold'>Formularz Wadium</h1>

         <p className='mb-10'>
            W razie pytań prosimy o kontakt test@aspergo.com
         </p>

         <DepositForm />
      </ContentContainer>
   </>
);

export default DepositFormPage;
