export const deleteUploadFilesAction = async (
   fileNames: string,
): Promise<boolean> => {
   try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileNames}`;

      const response = await fetch(apiUrl, {
         method: 'DELETE',
      });

      if (!response.ok) {
         console.error(
            `Код ${response.status} — Произошла ошибка при удалении загруженных файлов`,
         );

         return false;
      }

      return true;
   } catch (err) {
      console.error('Ошибка при удалении файлов:', err);

      return false;
   }
};
