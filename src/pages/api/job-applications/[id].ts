import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { deleteJobApplication } from '@/services/db/deleteJobApplication';
import { updateJobApplicationStatus } from '@/services/db/updateJobApplicationStatus';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   switch (req.method) {
      case 'PATCH': {
         try {
            const { status, closedDate } = JSON.parse(req.body);

            if (typeof status !== 'number') {
               return res.status(500).send({ error: 'invalid status' });
            }

            const isOk = await updateJobApplicationStatus(
               id as string,
               status,
               closedDate,
            );

            if (!isOk) {
               return res
                  .status(500)
                  .send({ error: 'failed update application' });
            }

            res.status(200).json({ isOk: true });
         } catch (err) {
            res.status(500).send({ error: 'failed update application' });
         }

         break;
      }

      case 'DELETE': {
         const session = await getSession({ req });

         if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
         }

         try {
            const isOk = await deleteJobApplication(id as string);

            if (!isOk) {
               return res
                  .status(500)
                  .send({ error: 'failed delete application' });
            }

            res.status(200).json({ isOk: true });
         } catch (err) {
            res.status(500).send({ error: 'failed delete application' });
         }

         break;
      }

      default:
         res.status(400).json({ message: 'Bad request' });
   }
};
