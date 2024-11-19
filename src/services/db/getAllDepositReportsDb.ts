import pool from '@/lib/db';
import { DepositReportData } from '@/types/depositReports';
import { RowDataPacket } from 'mysql2';

export type DepositReportModel = DepositReportData & {
   id: string;
};

const SQL_QUERY = 'SELECT * FROM reports';

export const getAllDepositReportsDb = async (): Promise<
   DepositReportModel[]
> => {
   const [rows] = await pool.query<RowDataPacket[]>(SQL_QUERY);

   if (rows.length > 0) {
      return rows as DepositReportModel[];
   }

   return [];
};
