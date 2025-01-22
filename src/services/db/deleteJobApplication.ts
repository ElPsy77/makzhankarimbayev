import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const SQL_QUERY = 'DELETE FROM applications WHERE id = ?';

export const deleteJobApplication = async (
   jobApplicationId: string,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      jobApplicationId,
   ]);

   return result.affectedRows === 1;
};
