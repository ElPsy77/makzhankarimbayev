export const deleteUploadFilesAction = async (
   fileNames: string,
): Promise<Response> => {
   const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileNames}`;

   const response = await fetch(apiUrl, {
      method: 'DELETE',
   });

   return response;
};
