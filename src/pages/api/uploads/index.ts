import type { NextApiRequest, NextApiResponse } from 'next';
import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import { generateUniqueUploadFilename } from '@/helpers/generateUniqueUploadFilename';
import { ResponseError } from '../deposit-reports';

export const config = {
   api: {
      bodyParser: false,
   },
};

export type UploadPostResponseData = {
   uploadNames: string;
};

export default async (
   req: NextApiRequest,
   res: NextApiResponse<UploadPostResponseData | ResponseError | any>,
) => {
   res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
   );
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

   switch (req.method) {
      case 'POST': {
         console.log('post');

         const form = formidable({
            keepExtensions: true,
            multiples: true,
         });

         console.log('form');

         form.parse(req, async (err, fields, files) => {
            if (err || !files.files || Object.keys(files.files).length === 0) {
               return res
                  .status(500)
                  .json({ error: 'Błąd zapisywania plików 1' });
            }

            const uploadNames: string[] = [];

            try {
               files.files.forEach((file) => {
                  if (!file.originalFilename || !file.originalFilename) {
                     throw Error('Błąd zapisywania plików 2');
                  }

                  const ext = path.extname(file.originalFilename);
                  const name = path.basename(file.originalFilename, ext);

                  const sanitizedFilename =
                     name
                        .toLowerCase()
                        .replace(/\s+/g, '_')
                        .replace(/\./g, '_') + ext;

                  const uploadDir = path.join(process.cwd(), '/tmp/uploads');
                  console.log(uploadDir);

                  const newPath = path.join(
                     uploadDir,
                     generateUniqueUploadFilename(uploadDir, sanitizedFilename),
                  );

                  console.log(newPath);

                  uploadNames.push(sanitizedFilename);

                  if (!fs.existsSync(uploadDir)) {
                     fs.mkdirSync(uploadDir, { recursive: true });
                  }

                  fs.renameSync(file.filepath, newPath);
               });

               return res.status(200).json({ uploadNames: uploadNames.join() });
            } catch (err) {
               return res
                  .status(500)
                  .json({ error: 'Błąd zapisywania plików 3', test: err });
            }
         });

         break;
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
