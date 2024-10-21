import { deleteDepositReport } from '@/services/db/deleteDepositReport';
import { updateDepositReport } from '@/services/db/updateDepositReport';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   switch (req.method) {
      case 'PATCH': {
         try {
            const depositReportData = JSON.parse(req.body);

            await updateDepositReport(id as string, depositReportData);

            res.status(200).json({ isOk: true });
         } catch (err) {
            res.status(500).send({ error: 'failed update report' });
         }

         break;
      }

      case 'DELETE': {
         try {
            await deleteDepositReport(id as string);

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
