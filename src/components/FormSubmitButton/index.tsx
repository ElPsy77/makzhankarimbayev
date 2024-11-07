import { ReactElement } from 'react';
import Button from 'antd/lib/button';

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
