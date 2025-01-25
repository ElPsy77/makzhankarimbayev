import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Spin } from 'antd';

import ContentContainer from '@/components/ContentContainer';
import LoginForm from '@/features/loginPanel/components/LoginForm';
import { useAuthSession } from '@/hooks/useAuthSession';

const LoginPanelPage = (): ReactElement => {
   const { isLoading, isAuth, redirectToUrl } =
      useAuthSession('/job-applications');

   if (isAuth) redirectToUrl();

   if (isLoading) {
      return <Spin />;
   }

   return (
      <>
         <Head>
            <title>Login Panel</title>
            <meta name='description' content='Login Panel' />
            <meta name='robots' content='noindex,nofollow' />
         </Head>

         <ContentContainer isLogin>
            <h1 className='mb-5 text-3xl font-bold'>Login Panel</h1>

            <LoginForm />
         </ContentContainer>
      </>
   );
};

export default LoginPanelPage;
