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
   res: NextApiResponse<UploadPostResponseData | ResponseError>,
) => {
   res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
   );
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

   switch (req.method) {
      case 'POST': {
         return res.status(200);
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
