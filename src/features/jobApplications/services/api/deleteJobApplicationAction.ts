export const deleteJobApplicationAction = async (
   jobApplicationId: string,
): Promise<boolean> => {
   try {
      const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${jobApplicationId}`;

      const response = await fetch(API_URL, {
         method: 'DELETE',
      });

      if (!response.ok) {
         console.error(
            `Code ${response.status} - Something wrong while delete job application`,
         );

         return false;
      }

      return true;
   } catch (err) {
      console.error(err);

      return false;
   }
};
