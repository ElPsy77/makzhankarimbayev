import { Form } from 'antd';
import FormSubmitButton from '@/components/FormSubmitButton';
import InputElement from '@/components/InputElement';
import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import { useLogin } from '../../hooks/useLogin';
import { LoginFormData } from '../../types';
import ErrorStatusMessage from '../ErrorStatusMessage';

const LoginForm = () => {
   const [formRef] = Form.useForm();

   const { isButtonLoading, errorStatus, loginUser, resetErrorStatus } =
      useLogin(formRef);

   return (
      <>
         <Form
            form={formRef}
            name='login-panel'
            validateMessages={validateMessages}
            onFinish={loginUser}
            onValuesChange={resetErrorStatus}
            {...formCommonProps}
         >
            <Form.Item<LoginFormData>
               label='Login'
               name='login'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<LoginFormData>
               label='Password'
               name='password'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement type='password' />
            </Form.Item>

            <Form.Item>
               <FormSubmitButton text='Sign in' isLoading={isButtonLoading} />
            </Form.Item>
         </Form>

         {errorStatus ? <ErrorStatusMessage status={errorStatus} /> : null}
      </>
   );
};

export default LoginForm;
