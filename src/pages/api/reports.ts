import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllReports, Report } from '../../services/reports/getAllReports';

export type GetResponseData = {
   reports: Report[];
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
            const reports = await getAllReports();

            res.status(200).json({ reports });
         } catch (err) {
            res.status(500).send({ error: 'failed get all reports' });
         }

         break;
      }

      case 'POST': {
         res.status(200).json({ reports: [] });
         break;
      }

      default:
         res.status(400).json({ error: 'Bad request' });
   }
};
