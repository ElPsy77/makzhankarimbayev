import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '@/components/Layout';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { theme } from '@/styles/ant-theme';
import '@/styles/globals.css';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
   return (
      <>
         <Head>
            <link rel='icon' href='/favicon.png' />
            <title>ЯРабота.</title>
         </Head>

         <SessionProvider>
            <ConfigProvider theme={theme}>
               <QueryClientProvider client={queryClient}>
                  <NotificationProvider>
                     <main className={`${lato.className}`}>
                        <Layout>
                           <Component {...pageProps} />
                        </Layout>
                     </main>
                  </NotificationProvider>
               </QueryClientProvider>
            </ConfigProvider>
         </SessionProvider>
      </>
   );
}
