import clientPromise from '../../lib/mongoDb';
import { ObjectId } from 'mongodb';

export const deleteDepositReport = async (reportId: string): Promise<void> => {
   const client = await clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   db.collection('reports').deleteOne({
      _id: new ObjectId(reportId),
   });
};
