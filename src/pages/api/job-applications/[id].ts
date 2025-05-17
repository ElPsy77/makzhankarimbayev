import { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader } from 'mysql2';
import db from '@/lib/db';

// Функция для преобразования даты в формат MySQL
const formatDateForMySQL = (date: string): string => {
   const jsDate = new Date(date);
   return jsDate.toISOString().slice(0, 19).replace('T', ' ');
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   const { id } = req.query;

   if (!id || Array.isArray(id)) {
      return res
         .status(400)
         .json({ error: 'Некорректный идентификатор заявки' });
   }

   switch (req.method) {
      case 'PATCH': {
         try {
            const { status, closedDate } = req.body;

            // Преобразование даты
            const formattedDate = closedDate
               ? formatDateForMySQL(closedDate)
               : null;

            // Обновление записи в базе данных
            const result = await db.query(
               `UPDATE ${process.env.DB_TABLE_NAME_APPLICATIONS} SET status = ?, closedDate = ? WHERE id = ?`,
               [status, formattedDate, id],
            );

            const [resultSetHeader] = result as ResultSetHeader[];
            if (resultSetHeader.affectedRows === 0) {
               return res.status(404).json({ error: 'Анкета не найдена' });
            }

            return res.status(200).json({ message: 'Статус успешно обновлён' });
         } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
         }
      }

      default:
         res.setHeader('Allow', ['PATCH']);
         return res
            .status(405)
            .json({ error: `Метод ${req.method} не поддерживается` });
   }
}
