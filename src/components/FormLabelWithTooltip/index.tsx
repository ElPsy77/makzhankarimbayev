import { ReactElement } from 'react';
import { Tooltip } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';

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
