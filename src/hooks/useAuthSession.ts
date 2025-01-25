import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type AuthSessionHookResult = {
   isLoading: boolean;
   isAuth: boolean;
   isUnAuth: boolean;
   redirectToUrl: () => void;
};

export const useAuthSession = (redirectUrl: string): AuthSessionHookResult => {
   const session = useSession();
   const router = useRouter();

   const isAuth = session?.status === 'authenticated' && !!session?.data;

   const isUnAuth = session?.status === 'unauthenticated';

   const isLoading = session?.status === 'loading';

   const redirectToUrl = () => {
      router.replace(redirectUrl);
   };

   return {
      isLoading,
      isAuth,
      isUnAuth,
      redirectToUrl,
   };
};
