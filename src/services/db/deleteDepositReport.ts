import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const SQL_QUERY = 'DELETE FROM reports WHERE id = ?';

export const deleteDepositReport = async (
   reportId: string,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [reportId]);

   return result.affectedRows === 1;
};
