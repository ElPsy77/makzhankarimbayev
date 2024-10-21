import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import clientPromise from '../../../lib/mongoDb';

export default NextAuth({
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {},
         async authorize(credentials) {
            const { login, password } = credentials;

            try {
               const client = await clientPromise;
               const db = client.db(process.env.MONGODB_DATABASE_NAME);

               const user = await db.collection('users').findOne({ login });

               if (user) {
                  const isValid = await compare(password, user.password);

                  if (isValid) {
                     return { id: user._id, login: user.login };
                  }
               }

               return null;
            } catch (error) {
               console.log('Error: ', error);
            }
         },
      }),
   ],
   session: {
      strategy: 'jwt',
   },
   pages: {
      signIn: '/panel-logowania',
   },
});
