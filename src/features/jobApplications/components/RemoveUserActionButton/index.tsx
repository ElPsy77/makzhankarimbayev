import { NotificationContext } from '@/providers/NotificationProvider';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ReactElement, useContext } from 'react';
import { useQueryClient } from 'react-query';

type RemoveJobApplicationActionButtonProps = {
   jobApplicationId: string;
};

const RemoveJobApplicationActionButton = ({
   jobApplicationId,
}: RemoveJobApplicationActionButtonProps): ReactElement<RemoveJobApplicationActionButtonProps> => {
   const queryClient = useQueryClient();
   const { showNotification } = useContext(NotificationContext);

   const handleRemoveUser = async (id: string) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications/${id}`,
            {
               method: 'DELETE',
            },
         );

         if (!response.ok) {
            alert('There was a problem deleting the application');

            return;
         }

         await queryClient.invalidateQueries(['jobApplications']);

         showNotification('Application deleted', 'success');
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <Popconfirm
         title='Attention! You delete the application'
         description='Are you sure you want to delete the selected application?'
         onConfirm={() => handleRemoveUser(jobApplicationId)}
         okText='Yes'
         cancelText='No'
         placement='topRight'
      >
         <Tooltip title='Delete application'>
            <Button className='text-lg px-3 py-5'>
               <DeleteOutlined />
            </Button>
         </Tooltip>
      </Popconfirm>
   );
};

export default RemoveJobApplicationActionButton;
