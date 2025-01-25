export const getUploadFilesAction = async (
   fileName: string,
): Promise<Response | null> => {
   try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileName}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
         console.error(
            `Code ${response.status} - Something wrong while get upload file`,
         );

         return response;
      }

      return response;
   } catch (err) {
      console.error(err);

      return null;
   }
};
