import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import fs from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getSession({ req });

   if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
   }

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

      case 'DELETE': {
         const { fileName } = req.query;

         if (!fileName || typeof fileName !== 'string') {
            return res.status(400).json({ error: 'Invalid fileNames' });
         }

         const files = fileName.split(',');

         const errors: string[] = [];

         for (const file of files) {
            const filePath = path.resolve('./uploads', file);

            if (!fs.existsSync(filePath)) {
               errors.push(`File not found: ${file}`);
               continue;
            }

            try {
               fs.unlinkSync(filePath);
            } catch (error) {
               errors.push(`Error deleting file: ${file}`);
            }
         }

         if (errors.length > 0) {
            return res.status(500).json({ errors });
         } else {
            return res
               .status(204)
               .json({ message: 'Files deleted successfully' });
         }
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
