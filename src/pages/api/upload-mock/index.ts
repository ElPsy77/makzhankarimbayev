import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
   api: {
      bodyParser: true,
   },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
   return res.status(200).json({ data: 'ok' });
};
