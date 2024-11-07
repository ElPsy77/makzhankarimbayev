const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads`;

export const uploadFilesAction = async (
   formData: FormData,
): Promise<Response> => {
   const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
   });

   return response;
};
