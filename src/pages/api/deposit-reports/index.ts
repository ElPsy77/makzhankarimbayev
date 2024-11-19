import type { NextApiRequest, NextApiResponse } from 'next';
import { sendDepositReport } from '@/features/depositForm/services/db/sendDepositReport';
import {
   DepositReportModel,
   getAllDepositReportsDb,
} from '@/services/db/getAllDepositReportsDb';
import { sendFormConfirmationEmail } from '@/lib/sendFormConfirmationEmail';

export type GetResponseData = {
   depositReports: DepositReportModel[];
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
            const depositReports = await getAllDepositReportsDb();

            res.status(200).json({ depositReports });
         } catch (err) {
            res.status(500).json({ error: 'failed get all deposit reports' });
         }

         break;
      }

      case 'POST': {
         try {
            const depositReportData: DepositReportModel = req.body;
            const isOk = await sendDepositReport(depositReportData);

            if (depositReportData.email) {
               sendFormConfirmationEmail(depositReportData.email);
            }

            if (!isOk) {
               res.status(500).json({ error: 'failed send deposit report' });
            }

            res.status(201);
         } catch (err) {
            res.status(500).json({ error: 'failed send deposit report' });
         }

         break;
      }

      default:
         res.status(400).json({ error: 'Bad request' });
   }
};
