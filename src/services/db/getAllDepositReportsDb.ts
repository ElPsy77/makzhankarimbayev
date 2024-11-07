import clientPromise from '@/lib/mongoDb';
import { DepositReportModel, DepositReportData } from '@/types/depositReports';

export const getAllDepositReportsDb = async (): Promise<
   DepositReportModel[]
> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   const reports = await db
      .collection<DepositReportData>('reports')
      .find({})
      .toArray();

   return reports;
};
