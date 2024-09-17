import { ReactElement } from 'react';
import { DatePicker, DatePickerProps } from 'antd';

const DatePickerElement = (props: DatePickerProps): ReactElement => (
   <DatePicker
      className='w-full input-big-size'
      placeholder='Wybierz datę'
      {...props}
   />
);

export default DatePickerElement;
