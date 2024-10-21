import React, { ReactElement } from 'react';
import TableReports from '@/components/TableReports';
import ContentContainer from '@/components/ContentContainer';
import { useQuery } from 'react-query';
import { getAllDepositReports } from '@/services/apiQueries/getAllDepositReports';
import { Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function DepositReportsPage(): ReactElement {
   const session = useSession();
   const router = useRouter();

   if (session?.status === 'unauthenticated' && !session?.data) {
      router.replace('/panel-logowania');
   }

   const {
      data: depositReports,
      isLoading,
      isError,
   } = useQuery({
      queryFn: async () => await getAllDepositReports(),
      queryKey: ['depositReports'],
   });

   if (!session || session.status !== 'authenticated') {
      return (
         <>
            <Spin />
         </>
      );
   }

   if (isError) {
      return <h2>Wystąpił problem podczas pobierania raportów...</h2>;
   }

   return (
      <ContentContainer isFull>
         <h1 className='mb-5 text-3xl font-bold'>Raporty Wadium</h1>

         {isLoading ? (
            <div className='flex'>
               <Spin className='mr-3' />
               Ładowanie danych
            </div>
         ) : (
            <TableReports depositReports={depositReports || []} />
         )}
      </ContentContainer>
   );
}
