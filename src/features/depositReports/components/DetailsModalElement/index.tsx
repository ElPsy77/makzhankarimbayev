import { ReactElement } from 'react';
import { Modal, Tag } from 'antd';
import { statusData } from '../TableReports';
import DetailsRow from '../DetailsRow';
import { ColumnsType, TableDataType } from '../../types';

export type DetailsModalElementProps = {
   activeReportData: TableDataType;
   tableColumns: ColumnsType;
   isModalOpen: boolean;
   handleOnCancel: () => void;
};

const DetailsModalElement = ({
   activeReportData,
   tableColumns,
   isModalOpen,
   handleOnCancel,
}: DetailsModalElementProps): ReactElement<DetailsModalElementProps> => {
   const { id, status, ...restActiveReportData } = activeReportData;

   const detailsElement = (
      <>
         <p className='mt-3 mb-7'>
            <Tag color={statusData[status].color} className='mr-0'>
               {statusData[status].text}
            </Tag>
         </p>

         {Object.entries(restActiveReportData).map(([objectKey, value]) =>
            value ? (
               <DetailsRow
                  key={objectKey}
                  detailKey={objectKey}
                  value={value}
                  tableColumns={tableColumns}
               />
            ) : null,
         )}
      </>
   );

   const modalTitle = (
      <p className='text-2xl'>{`Raport ${activeReportData?.caseSign}`}</p>
   );

   return (
      <Modal
         title={modalTitle}
         className='table-reports-modal'
         open={isModalOpen}
         onCancel={handleOnCancel}
         footer={null}
         centered
      >
         {detailsElement}
      </Modal>
   );
};

export default DetailsModalElement;
