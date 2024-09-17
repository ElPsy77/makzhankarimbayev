import { DepositReportData } from '@/types/depositReports';
import clientPromise from '../../lib/mongoDb';

export const sendDepositReport = async (
   depositReport: DepositReportData,
): Promise<void> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   db.collection('reports').insertOne(depositReport);
};
