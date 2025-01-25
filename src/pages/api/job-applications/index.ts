import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { sendJobApplicationDb } from '@/features/jobForm/services/db/sendJobApplicationDb';
import { sendFormConfirmationEmail } from '@/lib/sendFormConfirmationEmail';
import { getAllJobApplicationsDb } from '@/services/db/getAllJobApplicationsDb';
import { JobApplicationData } from '@/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getSession({ req });

   switch (req.method) {
      case 'GET': {
         if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
         }

         try {
            const jobApplications = await getAllJobApplicationsDb();

            return res.status(200).json({ jobApplications });
         } catch (err) {
            return res
               .status(500)
               .json({ error: 'failed get all job applications' });
         }
      }

      case 'POST': {
         try {
            const jobApplicationData: JobApplicationData = req.body;
            const isOk = await sendJobApplicationDb(jobApplicationData);

            if (jobApplicationData) {
               sendFormConfirmationEmail(jobApplicationData);
            }

            if (!isOk) {
               return res
                  .status(500)
                  .json({ error: 'failed send application' });
            }

            return res.status(201).json({ isOk: true });
         } catch (err) {
            return res.status(500).json({ error: 'failed send application' });
         }
      }

      default:
         return res.status(400).json({ error: 'Bad request' });
   }
};
