import { ResultSetHeader } from 'mysql2';

import pool from '@/lib/db';

const SQL_QUERY = `DELETE FROM ${process.env.DB_TABLE_NAME_APPLICATIONS} WHERE id = ?`;

export const deleteJobApplication = async (
   jobApplicationId: string,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      jobApplicationId,
   ]);

   return result.affectedRows === 1;
};
