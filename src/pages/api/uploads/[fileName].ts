import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   switch (req.method) {
      case 'GET': {
         const { fileName } = req.query;

         if (!fileName || Array.isArray(fileName)) {
            return res.status(400).json({ error: 'Invalid fileName' });
         }

         const filePath = path.resolve(
            './uploads',
            Array.isArray(fileName) ? fileName.join('/') : fileName,
         );

         if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'file not found' });
         }

         try {
            const fileContent = fs.readFileSync(filePath);

            res.setHeader('Content-Type', 'application/octet-stream');

            res.setHeader(
               'Content-Disposition',
               `attachment; filename="${Array.isArray(fileName) ? fileName.join('/') : fileName}"`,
            );

            res.send(fileContent);
         } catch (error) {
            return res.status(500).json({ error: 'Error fetching file' });
         }

         break;
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
}
