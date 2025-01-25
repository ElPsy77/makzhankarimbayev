import { RowDataPacket } from 'mysql2';

import pool from '@/lib/db';
import { JobApplicationDataWithId } from '@/types';

const SQL_QUERY = `SELECT * FROM ${process.env.DB_TABLE_NAME_APPLICATIONS}`;

export const getAllJobApplicationsDb = async (): Promise<
   JobApplicationDataWithId[]
> => {
   const [rows] = await pool.query<RowDataPacket[]>(SQL_QUERY);

   if (rows.length > 0) {
      return rows as JobApplicationDataWithId[];
   }

   return [];
};
