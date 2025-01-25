import { ReactElement } from 'react';
import { Modal } from 'antd';

import { ColumnsType, TableDataType } from '../../types';
import DetailsRow from '../DetailsRow';
import StatusTag from '../StatusTag';

export type DetailsModalElementProps = {
   activeJobApplicationData: TableDataType;
   tableColumns: ColumnsType;
   isModalOpen: boolean;
   handleOnCancel: () => void;
};

const DetailsModalElement = ({
   activeJobApplicationData,
   tableColumns,
   isModalOpen,
   handleOnCancel,
}: DetailsModalElementProps): ReactElement<DetailsModalElementProps> => {
   const { id, status, ...restActiveJobApplicationData } =
      activeJobApplicationData;

   const detailsElement = (
      <>
         <p className='mt-3 mb-7'>
            <StatusTag status={status} />
         </p>

         {Object.entries(restActiveJobApplicationData).map(
            ([objectKey, value]) =>
               value ? (
                  <DetailsRow
                     key={objectKey}
                     detailKey={objectKey}
                     value={`${value}`}
                     tableColumns={tableColumns}
                  />
               ) : null,
         )}
      </>
   );

   const modalTitle = (
      <p className='text-2xl'>{`Application ${activeJobApplicationData?.name}`}</p>
   );

   return (
      <Modal
         title={modalTitle}
         className='table-modal'
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
