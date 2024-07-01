import { WithId } from 'mongodb';
import clientPromise from '../../lib/mongoDb';

type ReportData = {
   name: string;
   email: string;
   password: string;
};

export type Report = WithId<ReportData>;

export const getAllReports = async (): Promise<Report[]> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   const reports = await db.collection<ReportData>('users').find({}).toArray();

   return reports;
};
