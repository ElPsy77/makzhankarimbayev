import React, { ChangeEvent, ReactElement } from 'react';

import { normalizerPhoneNumber } from '@/helpers/normalizerPhoneNumber';

import InputElement from '../InputElement';

const InputPhoneNumber = ({ ...props }): ReactElement => {
   const { onChange } = props || {};

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const value = event.currentTarget.value;
      const formatedValue = normalizerPhoneNumber(value);

      if (onChange) {
         onChange(formatedValue);
      }
   };

   return <InputElement {...props} onChange={handleChange} addonBefore='+48' />;
};

export default InputPhoneNumber;
