export const getUploadFilesAction = async (
   fileName: string,
): Promise<Response | null> => {
   try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileName}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
         console.error(
            `Код ${response.status} — Произошла ошибка при получении загруженного файла`,
         );

         return response;
      }

      return response;
   } catch (err) {
      console.error('Ошибка при получении файла:', err);

      return null;
   }
};
