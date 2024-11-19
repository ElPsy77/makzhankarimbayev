import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FormInstance, FormProps } from 'antd';
import { redirectToBackUrl } from '../helpers/redirectToBackUrl';

export type LoginFormData = {
   login: string;
   password: string;
};

type LoginHookResult = {
   isButtonLoading: boolean;
   errorStatus: number | null;
   loginUser: (formValues: LoginFormData) => void;
   resetErrorStatus: () => void;
};

export const useLogin = (formRef: FormInstance): LoginHookResult => {
   const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
   const [errorStatus, setErrorStatus] = useState<number | null>(null);

   const loginUser: FormProps<LoginFormData>['onFinish'] = async (
      formValues,
   ): Promise<void> => {
      setIsButtonLoading(true);

      const res = await signIn('credentials', {
         login: formValues.login,
         password: formValues.password,
         redirect: false,
      });

      if (!res?.ok) {
         setErrorStatus(res?.status || 500);
         formRef.resetFields();

         setIsButtonLoading(false);
         return;
      }

      redirectToBackUrl('/formularz-wadium/raporty', 1500);
   };

   const resetErrorStatus = (): void => {
      if (errorStatus !== null) {
         setErrorStatus(null);
      }
   };

   return {
      isButtonLoading,
      errorStatus,
      loginUser,
      resetErrorStatus,
   };
};
