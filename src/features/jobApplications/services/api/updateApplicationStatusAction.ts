import { statusData } from '../../components/StatusTag';

export const updateApplicationStatusAction = async (
   jobApplicationId: string,
   status: number,
): Promise<Response> => {
   const apiQuery = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${jobApplicationId}`;

   const response = await fetch(apiQuery, {
      method: 'PATCH',
      body: JSON.stringify({
         status,
         closedDate: statusData[status]?.isAccepted ? new Date() : null,
      }),
   });

   return response;
};
