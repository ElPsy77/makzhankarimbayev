import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { FormLayout } from 'antd/lib/form/Form';

export const formCommonProps = {
   layout: 'vertical' as FormLayout,
   autoComplete: 'off',
   requiredMark: false,
   size: 'large' as SizeType,
};

export const formItemCommonProps = {
   hasFeedback: true,
   validateDebounce: 500,
   className: 'mb-6',
};

export const validateMessages = {
   required: '${label} является обязательным полем',
   types: {
      email: 'Некорректный адрес электронной почты',
   },
};
