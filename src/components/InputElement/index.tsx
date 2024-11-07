import { ReactElement } from 'react';
import { Input, InputProps } from 'antd';

const InputElement = (props: InputProps): ReactElement<InputProps> => (
   <Input {...props} size='large' className='input-big-size' />
);

export default InputElement;
