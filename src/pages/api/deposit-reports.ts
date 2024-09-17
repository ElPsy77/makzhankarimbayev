import type { NextApiRequest, NextApiResponse } from 'next';
import { sendDepositReport } from '@/services/depositReports/sendDepositReport';
import { getAllDepositReports } from '@/services/depositReports/getAllDepositReports';
import { DepositReport } from '@/types/depositReports';

export type GetResponseData = {
   depositReports: DepositReport[];
};

export type ResponseError = {
   error: string;
};

export default async (
   req: NextApiRequest,
   res: NextApiResponse<GetResponseData | ResponseError>,
) => {
   switch (req.method) {
      case 'GET': {
         try {
            const depositReports = await getAllDepositReports();

            res.status(200).json({ depositReports });
         } catch (err) {
            res.status(500).send({ error: 'failed get all deposit reports' });
         }

         break;
      }

      case 'POST': {
         try {
            const depositReportData: DepositReport = req.body;
            sendDepositReport(depositReportData);

            res.status(201);
         } catch (err) {
            res.status(500).send({ error: 'failed send deposit report' });
         }

         break;
      }

      default:
         res.status(400).json({ error: 'Bad request' });
   }
};
