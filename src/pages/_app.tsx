import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import pl from 'antd/lib/locale/pl_PL';
import { theme } from '@/styles/ant-theme';
import { NotificationProvider } from '@/providers/NotificationProvider';

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

const queryClient = new QueryClient();

dayjs.locale('pl');

export default function App({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider>
         <ConfigProvider locale={pl} theme={theme}>
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
   );
}
