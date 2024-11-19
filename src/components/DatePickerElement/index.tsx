import { ReactElement } from 'react';
import { DatePicker, DatePickerProps } from 'antd';

const DatePickerElement = (props: DatePickerProps): ReactElement => (
   <DatePicker
      {...props}
      className='w-full input-big-size'
      placeholder='Wybierz datę'
   />
);

export default DatePickerElement;
