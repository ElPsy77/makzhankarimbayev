import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { ResponseError } from '../deposit-reports';
import { getSession } from 'next-auth/react';

export const config = {
   api: {
      bodyParser: false,
   },
};

export default async (
   req: NextApiRequest,
   res: NextApiResponse<Buffer | ResponseError | any>,
) => {
   switch (req.method) {
      case 'GET': {
         const session = await getSession({ req });

         if (!session) {
            return res.redirect(`/panel-logowania?backUrl=${req.url}`);
         }

         const { fileName } = req.query;

         if (!fileName) {
            return res.status(404).json({ error: 'file not found' });
         }

         const filePath = path.resolve(
            '.',
            'src/uploads',
            Array.isArray(fileName) ? fileName.join('/') : fileName,
         );

         if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'file not found' });
         }

         const fileContent = fs.readFileSync(filePath);

         res.setHeader('Content-Type', 'application/octet-stream');
         res.setHeader(
            'Content-Disposition',
            `attachment; filename="${Array.isArray(fileName) ? fileName.join('/') : fileName}"`,
         );
         res.send(fileContent);

         break;
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
