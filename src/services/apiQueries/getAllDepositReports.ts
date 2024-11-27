import { DepositReportDataWithId } from '@/types';

export const getAllDepositReports = async () => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports`,
   );

   const responseData = await response.json();
   let depositReports: DepositReportDataWithId[] = [];

   if (response.ok) {
      depositReports = responseData.depositReports;

      return depositReports;
   }

   throw Error('Wystąpił problem podczas pobierania raportów');
};
