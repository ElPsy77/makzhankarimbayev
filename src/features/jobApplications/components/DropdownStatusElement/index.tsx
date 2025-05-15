import { ReactElement, useContext } from 'react';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { useQueryClient } from 'react-query';
import { NotificationContext } from '@/providers/NotificationProvider';
import { EditOutlined } from '@ant-design/icons';
import { updateApplicationStatusAction } from '../../services/api/updateApplicationStatusAction';
import { statusData } from '../StatusTag';

type DropdownStatusElementProps = {
   jobApplicationId: string;
};

const DropdownStatusElement = ({
   jobApplicationId,
}: DropdownStatusElementProps): ReactElement<DropdownStatusElementProps> => {
   const queryClient = useQueryClient();
   const { showNotification } = useContext(NotificationContext);

   const handleDropdownItemOnClick = async (id: string, status: number) => {
      const isUpdateJobApplicationStatus = await updateApplicationStatusAction(
         id,
         status,
      );

      if (!isUpdateJobApplicationStatus) {
         return;
      }

      await queryClient.invalidateQueries(['jobApplications']);

      const notificationText = statusData[status]?.isAccepted
         ? 'Заявка перемещена в принятые'
         : 'Заявка перемещена в новые';

      showNotification(notificationText, 'success', 2);
   };

   const getStatusDropdownButtonItems = (
      applicationId: string,
   ): MenuProps['items'] =>
      statusData.map((status, index) => ({
         key: index,
         label: status.text,
         onClick: () => handleDropdownItemOnClick(applicationId, index),
      }));

   return (
      <Dropdown
         menu={{
            items: getStatusDropdownButtonItems(jobApplicationId),
         }}
         trigger={['click']}
         placement='bottomRight'
      >
         <Tooltip title='Изменить статус'>
            <Button className='text-lg px-3 py-5 mr-3'>
               <EditOutlined />
            </Button>
         </Tooltip>
      </Dropdown>
   );
};

export default DropdownStatusElement;
