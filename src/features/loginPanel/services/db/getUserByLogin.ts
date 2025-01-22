import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { LoginFormData } from '../../types';

type UserModel = LoginFormData;

const SQL_QUERY = 'SELECT * FROM users WHERE login = ?';

export const getUserByLogin = async (
   login: string,
): Promise<UserModel | null> => {
   const [rows] = await pool.query<RowDataPacket[]>(SQL_QUERY, [login]);

   if (rows.length > 0) {
      return rows[0] as UserModel;
   }

   return null;
};
