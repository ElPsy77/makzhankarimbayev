import { ReactElement, useContext } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useQueryClient } from 'react-query';
import { NotificationContext } from '@/providers/NotificationProvider';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteJobApplicationAction } from '../../services/api/deleteJobApplicationAction';
import { deleteUploadFilesAction } from '../../services/api/deleteUploadFilesAction';

type RemoveJobApplicationActionButtonProps = {
   jobApplicationId: string;
   uploadFiles: string | null;
};

const RemoveJobApplicationActionButton = ({
   jobApplicationId,
   uploadFiles,
}: RemoveJobApplicationActionButtonProps): ReactElement<RemoveJobApplicationActionButtonProps> => {
   const queryClient = useQueryClient();
   const { showNotification } = useContext(NotificationContext);

   const handleRemoveJobApplication = async (id: string) => {
      const isDeleteJobApplication = deleteJobApplicationAction(id);

      if (!isDeleteJobApplication) {
         return;
      }

      await queryClient.invalidateQueries(['jobApplications']);

      showNotification('Application deleted', 'success');

      if (
         uploadFiles &&
         uploadFiles.length > 0 &&
         !process.env.NEXT_PUBLIC_IS_DEMO_UPLOAD
      ) {
         await deleteUploadFilesAction(uploadFiles);
      }
   };

   return (
      <Popconfirm
         title='Внимание! Вы удаляете заявку'
         description='Вы уверены, что хотите удалить выбранную заявку?'
         onConfirm={() => handleRemoveJobApplication(jobApplicationId)}
         okText='Да'
         cancelText='Нет'
         placement='topRight'
      >
         <Tooltip title='Удалить заявку'>
            <Button className='text-lg px-3 py-5'>
               <DeleteOutlined />
            </Button>
         </Tooltip>
      </Popconfirm>
   );   
};

export default RemoveJobApplicationActionButton;
