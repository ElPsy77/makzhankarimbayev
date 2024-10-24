import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
   api: {
      bodyParser: true,
   },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
   switch (req.method) {
      case 'POST': {
         return res.status(200).json({ data: 'ok' });
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
};
