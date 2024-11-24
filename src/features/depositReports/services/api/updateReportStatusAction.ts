import { statusData } from '../../components/TableReports';

export const updateReportStatusAction = async (
   reportId: string,
   status: number,
): Promise<Response> => {
   const apiQuery = `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports/${reportId}`;

   const response = await fetch(apiQuery, {
      method: 'PATCH',
      body: JSON.stringify({
         status,
         closedDate: statusData[status]?.isArchive ? new Date() : null,
      }),
   });

   return response;
};
