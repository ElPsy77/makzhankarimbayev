import { JobApplicationFormData } from '../../types';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications`;

export const sendFormDataAction = async (
   formValues: JobApplicationFormData,
   uploadNames: string | null,
): Promise<Response> => {
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

   return response;
};
