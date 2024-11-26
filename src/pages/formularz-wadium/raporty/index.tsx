import { ReactElement } from 'react';
import TableReports from '@/features/depositReports/components/TableReports';
import ContentContainer from '@/components/ContentContainer';
import { useQuery } from 'react-query';
import { getAllDepositReports } from '@/services/apiQueries/getAllDepositReports';
import { Spin } from 'antd';
import { useAuthSession } from '@/hooks/useAuthSession';
import Head from 'next/head';

const DepositReportsPage = (): ReactElement => {
   const {
      isLoading: isAuthLoaing,
      isUnAuth,
      redirectToUrl,
   } = useAuthSession('/panel-logowania');

   const {
      data: depositReports,
      isLoading: isQueryLoading,
      isError,
   } = useQuery({
      queryFn: getAllDepositReports,
      queryKey: ['depositReports'],
      refetchOnWindowFocus: false,
   });

   if (isUnAuth) {
      redirectToUrl();
      return <Spin />;
   }

   if (isAuthLoaing) {
      return <Spin />;
   }

   if (isError) {
      return <h2>Wystąpił problem podczas pobierania raportów...</h2>;
   }

   return (
      <>
         <Head>
            <title>Aspergo - Raporty Wadium</title>
            <meta name='description' content='Raporty Wadium' />
            <meta name='robots' content='noindex,nofollow' />
         </Head>

         <ContentContainer isFull>
            <h1 className='mb-5 text-3xl font-bold'>Raporty Wadium</h1>

            {isQueryLoading ? (
               <div className='flex'>
                  <Spin className='mr-3' />
                  Ładowanie danych
               </div>
            ) : (
               <TableReports depositReports={depositReports || []} />
            )}
         </ContentContainer>
      </>
   );
};

export default DepositReportsPage;
