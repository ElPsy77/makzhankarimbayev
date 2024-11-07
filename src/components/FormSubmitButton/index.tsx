import { Button } from 'antd';
import { ReactElement } from 'react';

type FormSubmitButtonProps = {
   text: string;
   isLoading: boolean;
};

const FormSubmitButton = ({
   text,
   isLoading,
}: FormSubmitButtonProps): ReactElement<FormSubmitButtonProps> => (
   <Button
      type='primary'
      htmlType='submit'
      className='bg-green w-full px-10 py-7 hover:bg-brown text-lg mt-2'
      loading={isLoading}
   >
      {text}
   </Button>
);

export default FormSubmitButton;
