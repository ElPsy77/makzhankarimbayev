import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { ReactElement } from 'react';

type FormLabelWithTooltipProps = {
   text: string;
   tooltip: string;
};

const FormLabelWithTooltip = ({
   text,
   tooltip,
}: FormLabelWithTooltipProps): ReactElement<FormLabelWithTooltipProps> => {
   return (
      <>
         {text}

         <Tooltip title={tooltip} className='ml-1'>
            <InfoCircleOutlined className='form-tooltip-icon' />
         </Tooltip>
      </>
   );
};

export default FormLabelWithTooltip;
