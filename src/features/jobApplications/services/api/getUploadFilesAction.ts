export const getUploadFilesAction = async (
   fileName: string,
): Promise<Response> => {
   const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileName}`;

   const response = await fetch(apiUrl);

   return response;
};
