import { ReactElement, useContext } from 'react';
import { Button, Tooltip } from 'antd';

import { NotificationContext } from '@/providers/NotificationProvider';
import { CopyOutlined } from '@ant-design/icons';

type CopyButtonProps = {
   value: string;
};

const CopyButton = ({
   value,
}: CopyButtonProps): ReactElement<CopyButtonProps> => {
   const { showNotification } = useContext(NotificationContext);

   const handleOnClick = async (): Promise<void> => {
      try {
         await navigator.clipboard.writeText(value);

         showNotification('Copied', 'success');
      } catch {
         showNotification('Copy error', 'error');
      }
   };

   return (
      <Tooltip title='Copy value'>
         <Button
            onClick={handleOnClick}
            size='large'
            className='mt-1'
            icon={<CopyOutlined className='w-5' />}
         />
      </Tooltip>
   );
};

export default CopyButton;
