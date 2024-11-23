import { NotificationContext } from '@/providers/NotificationProvider';
import { EditOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { ReactElement, useContext } from 'react';
import { useQueryClient } from 'react-query';
import { updateReportStatusAction } from '../../services/api/updateReportStatusAction';
import { statusData } from '../TableReports';

type DropdownStatusElementProps = {
   userId: string;
};

const DropdownStatusElement = ({
   userId,
}: DropdownStatusElementProps): ReactElement<DropdownStatusElementProps> => {
   const queryClient = useQueryClient();
   const { showNotification } = useContext(NotificationContext);

   const handleDropdownItemOnClick = async (id: string, status: number) => {
      const isDone = status === 2;

      try {
         const reponse = await updateReportStatusAction(id, status, isDone);

         if (!reponse.ok) {
            alert('Coś poszło nie tak podczas aktualizacji statusu');

            return;
         }

         await queryClient.invalidateQueries(['depositReports']);

         showNotification(
            isDone
               ? 'Raport został przeniesiony do archiwum'
               : 'Status zaktualizowany',
            'success',
            2,
         );
      } catch (err) {
         console.error(err);
      }
   };

   const getStatusDropdownButtonItems = (
      reportId: string,
   ): MenuProps['items'] =>
      statusData.map((status, index) => ({
         key: index,
         label: status.text,
         onClick: () => handleDropdownItemOnClick(reportId, index),
      }));

   return (
      <Dropdown
         menu={{
            items: getStatusDropdownButtonItems(userId),
         }}
         trigger={['click']}
         placement='bottomRight'
      >
         <Tooltip title='Zmień status'>
            <Button className='text-lg px-3 py-5 mr-3'>
               <EditOutlined />
            </Button>
         </Tooltip>
      </Dropdown>
   );
};

export default DropdownStatusElement;
