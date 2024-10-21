import clientPromise from '../../lib/mongoDb';
import { ObjectId } from 'mongodb';
import { DepositReportData } from '@/types/depositReports';

export const updateDepositReport = async (
   reportId: string,
   newData: DepositReportData,
): Promise<void> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   db.collection('reports').findOneAndUpdate(
      {
         _id: new ObjectId(reportId),
      },
      { $set: newData },
   );
};
