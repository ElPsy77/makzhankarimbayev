import { DepositReport } from '@/types/depositReports';
import React, { ReactElement } from 'react';
import { GetResponseData, ResponseError } from '../../api/deposit-reports';

type DepositReportsPageProps = {
   depositReports: DepositReport[];
};

export default function DepositReportsPage({
   depositReports,
}: DepositReportsPageProps): ReactElement<DepositReportsPageProps> {
   console.log(depositReports);

   return (
      <>
         <h1 className='mb-5 text-3xl font-bold'>Admin Wadium</h1>
      </>
   );
}

export const getServerSideProps = async () => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports`,
   );
   const responseData: GetResponseData | ResponseError = await response.json();
   let depositReports: DepositReport[] = [];

   if (response.ok) {
      depositReports = (responseData as GetResponseData).depositReports;
   }

   return {
      props: {
         depositReports,
      },
   };
};
