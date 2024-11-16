import { ReactElement } from 'react';
import { Button, Tooltip } from 'antd';

type CopyButtonProps = {
   value: string;
};

const CopyButton = ({
   value,
}: CopyButtonProps): ReactElement<CopyButtonProps> => {
   const handleOnClick = async (): Promise<void> => {
      try {
         await navigator.clipboard.writeText(value);

         //  showNotification('Skopiowano');
      } catch {
         //  showNotification('Błąd kopiowania');
      }
   };

   return (
      <Tooltip title='Kopiuj wartość'>
         <Button
            onClick={handleOnClick}
            size='large'
            className='mt-1'
            //    icon={<CopyIcon className='w-5' />}
         />
      </Tooltip>
   );
};

export default CopyButton;
