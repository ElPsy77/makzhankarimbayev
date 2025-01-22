import React, { ReactElement } from 'react';
import ContentContainer from '@/components/ContentContainer';
import LoginForm from '@/features/loginPanel/components/LoginForm';
import { Spin } from 'antd';
import { useAuthSession } from '@/hooks/useAuthSession';
import Head from 'next/head';

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
