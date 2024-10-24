import type { NextApiRequest, NextApiResponse } from 'next';
import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import { ResponseError } from '../deposit-reports';
import { S3 } from 'aws-sdk';

export const config = {
   api: {
      bodyParser: false,
   },
};

const s3 = new S3({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
});

export type UploadPostResponseData = {
   uploadNames: string;
};

export default async (
   req: NextApiRequest,
   res: NextApiResponse<UploadPostResponseData | ResponseError | any>,
) => {
   switch (req.method) {
      case 'POST': {
         if (!process.env.AWS_S3_BUCKET_NAME) {
            return res
               .status(500)
               .json({ error: 'File saving error - bad s3 bucket name' });
         }

         const form = formidable({
            keepExtensions: true,
            multiples: true,
         });

         form.parse(req, async (err, fields, files) => {
            if (err || !files.files || Object.keys(files.files).length === 0) {
               return res.status(500).json({
                  error: 'File saving error - problem with files parse',
               });
            }

            const uploadNames: string[] = [];
            const uploadResults: S3.ManagedUpload.SendData[] = [];

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

                     let sanitizedFilename = name
                        .toLowerCase()
                        .replace(/\s+/g, '_')
                        .replace(/\./g, '_');

                     const checkFileResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/check-file/${sanitizedFilename + ext}`,
                     );

                     if (checkFileResponse.ok) {
                        sanitizedFilename = `${sanitizedFilename}_1`;
                     }

                     const finalFileName = sanitizedFilename + ext;

                     const fileStream = fs.createReadStream(file.filepath);

                     const uploadParams = {
                        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
                        Key: `uploads/${finalFileName}`,
                        Body: fileStream,
                        ContentType: file.mimetype || undefined,
                     };

                     await s3.upload(uploadParams).promise();

                     uploadNames.push(finalFileName);
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
