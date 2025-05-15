import { UploadPostResponseData } from '@/pages/api/uploads';

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads`;

// Функция для загрузки файлов на сервер
export const uploadFilesAction = async (
   formData: FormData,
): Promise<string | null> => {
   try {
      // Отправляем POST-запрос на загрузку файлов
      const response = await fetch(API_URL, {
         method: 'POST',
         body: formData,
      });

      // Проверка ответа сервера
      if (!response.ok) {
         console.error(
            `Код ${response.status} — Произошла ошибка при загрузке файла`,
         );
         return null;
      }

      // Парсим JSON-ответ
      const responseData: UploadPostResponseData = await response.json();

      // Возвращаем имена загруженных файлов
      return responseData.uploadNames;
   } catch (err) {
      console.error('Ошибка при загрузке файлов:', err);
      return null;
   }
};
