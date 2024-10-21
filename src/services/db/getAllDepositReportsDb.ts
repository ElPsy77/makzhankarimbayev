import clientPromise from '@/lib/mongoDb';
import { DepositReport, DepositReportData } from '@/types/depositReports';

export const getAllDepositReportsDb = async (): Promise<DepositReport[]> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   const reports = await db
      .collection<DepositReportData>('reports')
      .find({})
      .toArray();

   return reports;
};
