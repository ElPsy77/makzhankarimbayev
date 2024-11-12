import { WithId } from 'mongodb';
import clientPromise from '../../../../lib/mongoDb';
import { LoginFormData } from '../../hooks/useLogin';

export type UserModel = WithId<LoginFormData>;

export const getUserByLogin = async (
   login: string,
): Promise<UserModel | null> => {
   const client = clientPromise;
   const db = client.db(process.env.MONGODB_DATABASE_NAME);

   const user = await db.collection('users').findOne<UserModel>({ login });

   return user;
};
