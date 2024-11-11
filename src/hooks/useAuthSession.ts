import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type AuthSessionHookResult = {
   isLoading: boolean;
   isAuth: boolean;
   redirectToUrl: () => void;
};

export const useAuthSession = (redirectUrl: string): AuthSessionHookResult => {
   const session = useSession();
   const router = useRouter();

   const isAuth = session?.status === 'authenticated' && !!session?.data;

   const isLoading = session?.status === 'loading';

   const redirectToUrl = () => {
      router.replace(redirectUrl);
   };

   return {
      isLoading,
      isAuth,
      redirectToUrl,
   };
};
