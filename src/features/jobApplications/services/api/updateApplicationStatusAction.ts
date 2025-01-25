import { statusData } from '../../components/StatusTag';

export const updateApplicationStatusAction = async (
   jobApplicationId: string,
   status: number,
): Promise<boolean> => {
   try {
      const apiQuery = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${jobApplicationId}`;

      const response = await fetch(apiQuery, {
         method: 'PATCH',
         body: JSON.stringify({
            status,
            closedDate: statusData[status]?.isAccepted ? new Date() : null,
         }),
      });

      if (!response.ok) {
         console.error(
            `Code ${response.status} - Something wrong while updating status`,
         );

         return false;
      }

      return true;
   } catch (err) {
      console.error(err);

      return false;
   }
};
