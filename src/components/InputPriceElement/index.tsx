import React, { ChangeEvent, ReactElement } from 'react';
import { normalizerPrice } from '@/helpers/normalizerPrice';
import InputElement from '../InputElement';

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

   return <InputElement {...props} onChange={handleChange} addonAfter='zł' />;
};

export default InputPriceElement;
