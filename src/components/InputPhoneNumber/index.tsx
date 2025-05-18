import React, { ChangeEvent, ReactElement } from 'react';
import { normalizerPhoneNumber } from '@/helpers/normalizerPhoneNumber';
import InputElement from '../InputElement';

const InputPhoneNumber = ({ ...props }): ReactElement => {
   const { onChange } = props || {};

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const value = event.currentTarget.value;

      // Форматируем номер телефона, оставляя только 10 цифр
      const formatedValue = normalizerPhoneNumber(value).slice(0, 10);

      console.log('Введённый номер:', value);
      console.log('Форматированный номер:', formatedValue);

      if (onChange) {
         onChange(formatedValue);
      }
   };

   return <InputElement {...props} onChange={handleChange} addonBefore='+7' />;
};

export default InputPhoneNumber;
