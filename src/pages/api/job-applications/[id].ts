import { NextApiRequest, NextApiResponse } from 'next';
import { updateApplicationStatusAction as updateJobApplicationStatus } from '@/features/jobApplications/services/api/updateApplicationStatusAction';
import db from '@/lib/db';

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
            const { status, closedDate } = JSON.parse(req.body);

            if (typeof status !== 'number') {
               return res.status(400).json({ error: 'Неверный статус' });
            }

            await updateJobApplicationStatus(id as string, status, closedDate);

            res.status(200).json({ success: true });
         } catch (err) {
            console.error('❌ Ошибка при обновлении заявки:', err);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
         }
         break;
      }

      case 'DELETE': {
         try {
            const result = await db.query(
               `DELETE FROM ${process.env.DB_TABLE_NAME_APPLICATIONS} WHERE id = ?`,
               [id],
            );

            const [resultSetHeader] = result as any[];
            if (resultSetHeader.affectedRows === 0) {
               return res.status(404).json({ error: 'Анкета не найдена' });
            }

            return res.status(200).json({ message: 'Анкета успешно удалена' });
         } catch (error) {
            console.error('Ошибка при удалении анкеты:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
         }
      }

      default:
         res.setHeader('Allow', ['PATCH', 'DELETE']);
         res.status(405).json({
            error: `Метод ${req.method} не поддерживается`,
         });
   }
}
