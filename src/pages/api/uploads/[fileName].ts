import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ResponseError } from '../deposit-reports';
import { getSession } from 'next-auth/react';

export default async (
   req: NextApiRequest,
   res: NextApiResponse<Buffer | ResponseError | any>,
) => {
   res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
   );
   res.setHeader('Access-Control-Allow-Methods', 'GET');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

   switch (req.method) {
      case 'GET': {
         const session = await getSession({ req });

         if (!session) {
            return res.redirect(`/panel-logowania?backUrl=${req.url}`);
         }

         const { fileName } = req.query;

         if (!fileName) {
            return res.status(404).json({ error: 'fileName not found' });
         }

         const filePath = path.resolve(
            os.tmpdir(),
            'uploads',
            Array.isArray(fileName) ? fileName.join('/') : fileName,
         );

         if (!fs.existsSync(filePath)) {
            return res
               .status(404)
               .json({ error: 'file not found', filePath: filePath });
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
