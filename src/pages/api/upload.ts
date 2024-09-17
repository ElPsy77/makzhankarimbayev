import type { NextApiRequest, NextApiResponse } from 'next';
import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import { generateUniqueUploadFilename } from '@/helpers/generateUniqueUploadFilename';
import { ResponseError } from './deposit-reports';

export const config = {
   api: {
      bodyParser: false,
   },
};

export type UploadPostResponseData = {
   uploadUrls: string;
};

export default async (
   req: NextApiRequest,
   res: NextApiResponse<UploadPostResponseData | ResponseError>,
) => {
   if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
   }

   const form = formidable({
      keepExtensions: true,
      multiples: true,
   });

   form.parse(req, async (err, fields, files) => {
      if (err || !files.files || Object.keys(files.files).length === 0) {
         return res.status(500).json({ error: 'Błąd zapisywania plików' });
      }

      const uploadUrls: string[] = [];

      try {
         files.files.forEach((file) => {
            if (!file.originalFilename || !file.originalFilename) {
               throw Error('Błąd zapisywania plików');
            }

            const ext = path.extname(file.originalFilename);
            const name = path.basename(file.originalFilename, ext);

            const sanitizedFilename =
               name.toLowerCase().replace(/\s+/g, '_').replace(/\./g, '_') +
               ext;

            const uploadDir = path.join(process.cwd(), '/public/uploads');
            const newPath = path.join(
               uploadDir,
               generateUniqueUploadFilename(uploadDir, sanitizedFilename),
            );

            uploadUrls.push(newPath);

            if (!fs.existsSync(uploadDir)) {
               fs.mkdirSync(uploadDir, { recursive: true });
            }

            fs.renameSync(file.filepath, newPath);
         });

         return res.status(200).json({ uploadUrls: uploadUrls.join() });
      } catch (err) {
         return res.status(500).json({ error: 'Błąd zapisywania plików' });
      }
   });
};
