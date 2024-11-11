import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import FormSubmitButton from '@/components/FormSubmitButton';
import { Form } from 'antd';
import InputElement from '@/components/InputElement';
import ErrorStatusMessage from '../ErrorStatusMessage';
import { LoginFormData, useLogin } from '../../hooks/useLogin';

const LoginForm = () => {
   const [formRef] = Form.useForm();
   const { isButtonLoading, errorStatus, loginUser, resetErrorStatus } =
      useLogin(formRef);

   return (
      <>
         <Form
            form={formRef}
            name='panel-logowania'
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

         {errorStatus ? <ErrorStatusMessage status={errorStatus} /> : null}
      </>
   );
};

export default LoginForm;
