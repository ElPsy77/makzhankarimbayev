import { ReactElement } from 'react';
import { Input, InputProps } from 'antd';

const InputElement = (props: InputProps): ReactElement<InputProps> => (
   <Input className='input-big-size' {...props} />
);

export default InputElement;
