import { GetResponseData, ResponseError } from '@/pages/api/deposit-reports';
import { DepositReport } from '@/types/depositReports';

export const getAllDepositReports = async () => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports`,
   );

   const responseData: GetResponseData | ResponseError = await response.json();
   let depositReports: DepositReport[] = [];

   if (response.ok) {
      depositReports = (responseData as GetResponseData).depositReports;

      return depositReports;
   }

   throw Error('Wystąpił problem podczas pobierania raportów-');
};
