import { ReactElement } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type NameRowProps = {
   text: string;
   iconOnClick: () => void;
};

const NameRow = ({
   text,
   iconOnClick,
}: NameRowProps): ReactElement<NameRowProps> => {
   const detailsIconElement = (
      <Tooltip title='See details'>
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

export default NameRow;
