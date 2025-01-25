import { JobApplicationFormData } from '../../types';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications`;

export const sendFormDataAction = async (
   formValues: JobApplicationFormData,
   uploadNames: string | null,
): Promise<boolean> => {
   try {
      const response = await fetch(API_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            ...formValues,
            uploadNames,
            status: 0,
            createdDate: new Date(),
            closedDate: null,
         }),
      });

      if (!response.ok) {
         console.error(
            `Code ${response.status} - Something wrong while send form`,
         );

         return false;
      }

      return true;
   } catch (err) {
      console.error(err);

      return false;
   }
};
