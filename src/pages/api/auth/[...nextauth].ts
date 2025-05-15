import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { getUserByLogin } from '@/features/loginPanel/services/db/getUserByLogin';

export default NextAuth({
   providers: [
      CredentialsProvider({
         name: 'Учетные данные',
         credentials: {
            login: { type: 'text' },
            password: { type: 'password' },
         },
         async authorize(credentials) {
            const login = credentials?.login;
            const password = credentials?.password;

            if (!login || !password) {
               console.error('Отсутствуют логин или пароль');
               return null;
            }

            try {
               const user = await getUserByLogin(login);
               console.log('Пользователь найден:', user);

               if (user) {
                  const isValid = await compare(password, user.password);
                  console.log('Пароль верен:', isValid);

                  if (isValid) {
                     return { id: user.login, login: user.login };
                  }
               }

               return null;
            } catch (error) {
               console.error('Ошибка при авторизации:', error);
               return null;
            }
         },
      }),
   ],
   session: {
      strategy: 'jwt',
   },
   pages: {
      signIn: '/login-panel',
   },
});
