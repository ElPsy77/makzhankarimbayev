import { statusData } from '../../components/StatusTag';

export const updateApplicationStatusAction = async (
   jobApplicationId: string,
   status: number,
   closedDate?: string | null,
): Promise<boolean> => {
   try {
      const apiQuery = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${jobApplicationId}`;

      const response = await fetch(apiQuery, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            status,
            closedDate: closedDate ?? new Date().toISOString(),
         }),
      });

      if (!response.ok) {
         console.error(`Ошибка при обновлении статуса: ${response.statusText}`);
         return false;
      }

      return true;
   } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
      return false;
   }
};
