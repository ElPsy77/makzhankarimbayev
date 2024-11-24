import React, { ChangeEvent, ReactElement } from 'react';
import { Input } from 'antd';
import { normalizerPrice } from '@/helpers/normalizerPrice';

const InputPriceElement = ({ ...props }): ReactElement => {
   const { onChange } = props || {};

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const value = event.currentTarget.value;
      const formatedValue = normalizerPrice(value);

      if (onChange) {
         onChange(formatedValue);
      }
   };

   return (
      <Input
         {...props}
         size='large'
         className='input-big-size'
         addonAfter='zł'
         onChange={handleChange}
      />
   );
};

export default InputPriceElement;
