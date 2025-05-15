import { JobApplicationFormData } from '../../types';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications`;

export const sendFormDataAction = async (
   formValues: JobApplicationFormData,
   uploadNames: string | null,
): Promise<boolean> => {
   try {
      console.log('Отправка данных формы:', {
         ...formValues,
         uploadNames,
         status: 0,
         createdDate: new Date(),
         closedDate: null,
      });

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
            `❌ Ошибка при отправке формы. Код ответа: ${response.status}`,
         );

         return false;
      }

      console.log('✅ Форма успешно отправлена.');
      return true;
   } catch (err) {
      console.error('❌ Ошибка при отправке формы:', err);

      return false;
   }
};
