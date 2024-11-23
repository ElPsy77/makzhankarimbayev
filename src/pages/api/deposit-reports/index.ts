import type { NextApiRequest, NextApiResponse } from 'next';
import { sendDepositReport } from '@/features/depositForm/services/db/sendDepositReport';
import {
   DepositReportModel,
   getAllDepositReportsDb,
} from '@/services/db/getAllDepositReportsDb';
import { sendFormConfirmationEmail } from '@/lib/sendFormConfirmationEmail';
import { getSession } from 'next-auth/react';

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
   const session = await getSession({ req });

   switch (req.method) {
      case 'GET': {
         if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
         }

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
               return res
                  .status(500)
                  .json({ error: 'failed send deposit report' });
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
