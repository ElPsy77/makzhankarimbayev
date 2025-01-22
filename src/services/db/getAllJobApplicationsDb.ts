import pool from '@/lib/db';
import { JobApplicationDataWithId } from '@/types';
import { RowDataPacket } from 'mysql2';

const SQL_QUERY = 'SELECT * FROM applications';

export const getAllJobApplicationsDb = async (): Promise<
   JobApplicationDataWithId[]
> => {
   const [rows] = await pool.query<RowDataPacket[]>(SQL_QUERY);

   if (rows.length > 0) {
      return rows as JobApplicationDataWithId[];
   }

   return [];
};
