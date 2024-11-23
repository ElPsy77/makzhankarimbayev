import { NotificationContext } from '@/providers/NotificationProvider';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ReactElement, useContext } from 'react';
import { useQueryClient } from 'react-query';

type RemoveUserActionButtonProps = {
   userId: string;
};

const RemoveUserActionButton = ({
   userId,
}: RemoveUserActionButtonProps): ReactElement<RemoveUserActionButtonProps> => {
   const queryClient = useQueryClient();
   const { showNotification } = useContext(NotificationContext);

   const handleRemoveUser = async (id: string) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports/${id}`,
            {
               method: 'DELETE',
            },
         );

         if (!response.ok) {
            alert('Wystąpił problem podczas usuwania raportu');

            return;
         }

         await queryClient.invalidateQueries(['depositReports']);

         showNotification('Raport usunięty', 'success');
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <Popconfirm
         title='Uwaga! Usuwasz raport'
         description={
            <>
               Czy jesteś pewny ze chcesz usunąć wybrany raport?
               <br />
               Raport ten NIE zostanie przeniesiony do archiwum
            </>
         }
         onConfirm={() => handleRemoveUser(userId)}
         okText='Tak'
         cancelText='Nie'
         placement='topRight'
      >
         <Tooltip title='Usuń raport'>
            <Button className='text-lg px-3 py-5'>
               <DeleteOutlined />
            </Button>
         </Tooltip>
      </Popconfirm>
   );
};

export default RemoveUserActionButton;
