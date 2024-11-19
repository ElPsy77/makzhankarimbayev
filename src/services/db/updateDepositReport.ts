import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const SQL_QUERY = 'UPDATE reports SET status = ?, closedDate = ? WHERE id = ?';

export const updateDepositReportStatus = async (
   reportId: string,
   status: number,
   closedDate: string,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      status,
      closedDate,
      reportId,
   ]);

   return result.affectedRows === 1;
};
