export const updateReportStatusAction = async (
   reportId: string,
   status: number,
   isDoneStatus: boolean,
): Promise<Response> => {
   const apiQuery = `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports/${reportId}`;

   const response = await fetch(apiQuery, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         status,
         closedDate: isDoneStatus ? new Date() : null,
      }),
   });

   return response;
};
