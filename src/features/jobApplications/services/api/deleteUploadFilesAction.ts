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
            `Code ${response.status} - Something wrong while delete upload files`,
         );

         return false;
      }

      return true;
   } catch (err) {
      console.error(err);

      return false;
   }
};
