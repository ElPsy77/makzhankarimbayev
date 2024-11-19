import { deleteDepositReport } from '@/services/db/deleteDepositReport';
import { updateDepositReportStatus } from '@/services/db/updateDepositReport';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getSession({ req });

   if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
   }

   const { id } = req.query;

   switch (req.method) {
      case 'PATCH': {
         try {
            const { status, closedDate } = JSON.parse(req.body);

            const isOk = await updateDepositReportStatus(
               id as string,
               status,
               closedDate,
            );

            if (!isOk) {
               res.status(500).send({ error: 'failed update report' });
            }

            res.status(200).json({ isOk: true });
         } catch (err) {
            res.status(500).send({ error: 'failed update report' });
         }

         break;
      }

      case 'DELETE': {
         try {
            const isOk = await deleteDepositReport(id as string);

            if (!isOk) {
               res.status(500).send({ error: 'failed delete report' });
            }

            res.status(200).json({ isOk: true });
         } catch (err) {
            res.status(500).send({ error: 'failed delete report' });
         }

         break;
      }

      default:
         res.status(400).json({ message: 'Bad request' });
   }
};
