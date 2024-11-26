import type { NextApiRequest, NextApiResponse } from 'next';
import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import { generateUniqueUploadFilename } from '@/helpers/generateUniqueUploadFilename';

export type UploadPostResponseData = {
   uploadNames: string;
};

export const config = {
   api: {
      bodyParser: false,
   },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
   switch (req.method) {
      case 'POST': {
         const form = formidable({
            keepExtensions: true,
            multiples: true,
         });

         form.parse(req, async (err, _, files) => {
            if (err || !files.files || Object.keys(files.files).length === 0) {
               return res.status(500).json({
                  error: 'File saving error - problem with files parse',
               });
            }

            const uploadNames: string[] = [];

            try {
               await Promise.all(
                  files.files.map(async (file) => {
                     if (!file.originalFilename) {
                        throw Error(
                           'File saving error - originalFilename not exist',
                        );
                     }

                     const ext = path.extname(file.originalFilename);
                     const name = path.basename(file.originalFilename, ext);

                     let sanitizedFilename =
                        name
                           .toLowerCase()
                           .replace(/[^a-z0-9]+/g, '_')
                           .replace(/^_+|_+$/g, '')
                           .replace(/\./g, '_') + ext;

                     const uploadDir = './uploads';

                     const newPath = path.join(
                        uploadDir,
                        generateUniqueUploadFilename(
                           uploadDir,
                           sanitizedFilename,
                        ),
                     );

                     uploadNames.push(sanitizedFilename);

                     if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                     }

                     fs.copyFileSync(file.filepath, newPath);
                  }),
               );

               return res.status(200).json({
                  uploadNames: uploadNames.join(),
               });
            } catch (err) {
               return res.status(500).json({ error: 'File saving error' });
            }
         });

         break;
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
