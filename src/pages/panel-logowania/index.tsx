import React, { ReactElement, useState } from 'react';
import { FormProps, Button, Form, Alert, Spin } from 'antd';
import InputElement from '@/components/InputElement';
import ContentContainer from '@/components/ContentContainer';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type LoginForm = {
   login: string;
   password: string;
};

const formItemCommonProps = {
   hasFeedback: true,
   validateDebounce: 500,
   className: 'mb-6',
};

const validateMessages = {
   required: '${label} jest polem wymaganym',
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
            layout='vertical'
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
            size='large'
            validateMessages={validateMessages}
            onValuesChange={handleOnChange}
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
               <Spin spinning={isButtonLoading}>
                  <Button
                     type='primary'
                     htmlType='submit'
                     className='bg-green w-full px-10 py-7 hover:bg-brown text-lg mt-2'
                  >
                     Zaloguj
                  </Button>
               </Spin>
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
