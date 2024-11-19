import { ReactElement, useContext } from 'react';
import { Button, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { NotificationContext } from '@/providers/notificationProvider';

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

         showNotification('Skopiowano', 'success');
      } catch {
         showNotification('Błąd kopiowania', 'error');
      }
   };

   return (
      <Tooltip title='Kopiuj wartość'>
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
