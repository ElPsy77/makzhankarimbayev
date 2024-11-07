import React, { ReactElement, useState } from 'react';
import { FormProps, Form, Alert, Spin } from 'antd';
import InputElement from '@/components/InputElement';
import ContentContainer from '@/components/ContentContainer';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import FormSubmitButton from '@/components/FormSubmitButton';

type LoginForm = {
   login: string;
   password: string;
};

export default function LoginPanelPage(): ReactElement {
   const session = useSession();
   const router = useRouter();

   if (session?.status === 'authenticated' && session?.data) {
      router.replace('/formularz-wadium/raporty');
   }

   const [formRef] = Form.useForm();
   const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
   const [errorStatus, setErrorStatus] = useState<number | null>(null);

   const onFinish: FormProps<LoginForm>['onFinish'] = async (formValues) => {
      setIsButtonLoading(true);

      const res = await signIn('credentials', {
         login: formValues.login,
         password: formValues.password,
         redirect: false,
      });

      if (res?.ok) {
         formRef.resetFields();

         setTimeout(() => {
            if (router.query?.backUrl) {
               router.push(router.query.backUrl as string);
            }

            router.push('/formularz-wadium/raporty');
         }, 1500);
      } else {
         formRef.resetFields();
         setErrorStatus(res?.status || 500);
      }

      setIsButtonLoading(false);
   };

   const handleOnChange = () => {
      if (errorStatus !== null) {
         setErrorStatus(null);
      }
   };

   if (!session || session.status !== 'unauthenticated') {
      return (
         <>
            <Spin />
         </>
      );
   }

   return (
      <ContentContainer isLogin>
         <h1 className='mb-5 text-3xl font-bold'>Panel logowania</h1>

         <Form
            form={formRef}
            name='panel-logowania'
            validateMessages={validateMessages}
            onFinish={onFinish}
            onValuesChange={handleOnChange}
            {...formCommonProps}
         >
            <Form.Item<LoginForm>
               label='Login'
               name='login'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<LoginForm>
               label='Hasło'
               name='password'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement type='password' />
            </Form.Item>

            <Form.Item>
               <FormSubmitButton text='Zaloguj' isLoading={isButtonLoading} />
            </Form.Item>
         </Form>

         {errorStatus === 401 ? (
            <Alert
               message='Login lub hasło jest nieprawidłowe'
               type='error'
               showIcon
            />
         ) : null}

         {errorStatus && errorStatus !== 401 ? (
            <Alert
               message='Wystąpił problem z logowanie, proszę skontaktować się z administratorem.'
               type='error'
               showIcon
            />
         ) : null}
      </ContentContainer>
   );
}
