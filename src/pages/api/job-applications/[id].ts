import { NextApiRequest, NextApiResponse } from 'next';
import { updateJobApplicationStatus } from '@/services/db/updateJobApplicationStatus';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   switch (req.method) {
      case 'PATCH': {
         try {
            const { status, closedDate } = JSON.parse(req.body);

            if (typeof status !== 'number') {
               return res.status(400).json({ error: 'Неверный статус' });
            }

            const isOk = await updateJobApplicationStatus(
               id as string,
               status,
               closedDate,
            );

            if (!isOk) {
               return res
                  .status(500)
                  .json({ error: 'Не удалось обновить заявку' });
            }

            res.status(200).json({ success: true });
         } catch (err) {
            console.error('❌ Ошибка при обновлении заявки:', err);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
         }
         break;
      }

      default:
         res.status(405).json({ error: 'Метод не разрешён' });
   }
};
