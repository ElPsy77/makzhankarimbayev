import { ReactElement } from 'react';
import { InputNumberProps, InputNumber } from 'antd';

const InputNumberElement = (
   props: InputNumberProps,
): ReactElement<InputNumberProps> => (
   <InputNumber
      size='large'
      className='input-number w-full flex items-center'
      controls={false}
      {...props}
   />
);

export default InputNumberElement;
