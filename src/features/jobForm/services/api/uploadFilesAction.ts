import { UploadPostResponseData } from '@/pages/api/uploads';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads`;

export const uploadFilesAction = async (
   formData: FormData,
): Promise<string | null> => {
   try {
      const response = await fetch(API_URL, {
         method: 'POST',
         body: formData,
      });

      if (!response.ok) {
         console.error(
            `Code ${response.status} - Something wrong while upload file`,
         );

         return null;
      }

      const responseData: UploadPostResponseData = await response.json();

      return responseData.uploadNames;
   } catch (err) {
      console.error(err);

      return null;
   }
};
