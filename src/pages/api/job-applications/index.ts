import type { NextApiRequest, NextApiResponse } from 'next';
import { sendJobApplicationDb } from '@/features/jobForm/services/db/sendJobApplicationDb';
import { JobApplicationData } from '@/types';
import { getAllJobApplicationsDb } from '@/services/db/getAllJobApplicationsDb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   switch (req.method) {
      case 'POST': {
         try {
            const jobApplicationData: JobApplicationData = req.body;
            console.log('📦 Пришли данные:', jobApplicationData); // Лог данных

            const result = await sendJobApplicationDb(jobApplicationData);

            if (!result) {
               console.error('❌ Ошибка: Не удалось сохранить данные в БД');
               return res
                  .status(500)
                  .json({ error: 'Failed to save job application' });
            }

            console.log('✅ Данные успешно сохранены в БД');
            return res.status(200).json({ success: true });
         } catch (err) {
            console.error('❌ Ошибка внутри POST:', err);
            return res.status(500).json({ error: 'Internal server error' });
         }
      }

      case 'GET': {
         try {
            const jobApplications = await getAllJobApplicationsDb();

            return res.status(200).json({ jobApplications });
         } catch (err) {
            console.error('❌ Ошибка при получении заявок:', err);
            return res.status(500).json({ error: 'Failed to fetch job applications' });
         }
      }

      default:
         return res.status(405).json({ error: 'Method Not Allowed' });
   }
};
