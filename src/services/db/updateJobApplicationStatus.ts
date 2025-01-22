import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const SQL_QUERY =
   'UPDATE applications SET status = ?, closedDate = ? WHERE id = ?';

export const updateJobApplicationStatus = async (
   jobApplicationId: string,
   status: number,
   closedDate: string,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      status,
      closedDate,
      jobApplicationId,
   ]);

   return result.affectedRows === 1;
};
