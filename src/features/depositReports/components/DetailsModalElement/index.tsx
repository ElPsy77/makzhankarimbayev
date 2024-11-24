import { ReactElement } from 'react';
import { Modal } from 'antd';
import DetailsRow from '../DetailsRow';
import { ColumnsType, TableDataType } from '../../types';
import StatusTag from '../StatusTag';

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
            <StatusTag status={status} />
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
      <p className='text-2xl'>{`Raport ${activeReportData?.companyName}`}</p>
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
