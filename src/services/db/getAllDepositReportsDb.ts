import pool from '@/lib/db';
import { DepositReportDataWithId } from '@/types';
import { RowDataPacket } from 'mysql2';

const SQL_QUERY = 'SELECT * FROM reports';

export const getAllDepositReportsDb = async (): Promise<
   DepositReportDataWithId[]
> => {
   const [rows] = await pool.query<RowDataPacket[]>(SQL_QUERY);

   if (rows.length > 0) {
      return rows as DepositReportDataWithId[];
   }

   return [];
};
