import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ReactElement } from 'react';

type CompanyNameRowProps = {
   text: string;
   iconOnClick: () => void;
};

const CompanyNameRow = ({
   text,
   iconOnClick,
}: CompanyNameRowProps): ReactElement<CompanyNameRowProps> => {
   const detailsIconElement = (
      <Tooltip title='Zobacz szczegóły'>
         <Button className='text-l px-3 py-5 mr-3' onClick={iconOnClick}>
            <PlusOutlined />
         </Button>
      </Tooltip>
   );

   return (
      <div className='flex items-center'>
         {detailsIconElement}

         {text}
      </div>
   );
};

export default CompanyNameRow;
