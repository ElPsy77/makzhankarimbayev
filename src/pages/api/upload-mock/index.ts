import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   res.setHeader(
      'Access-Control-Allow-Origin',
      `${process.env.NEXT_PUBLIC_BASE_URL}`,
   );
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

   switch (req.method) {
      case 'POST': {
         return res.status(200).json({ data: 'ok' });
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
