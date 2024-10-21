import { ReactElement } from 'react';
import { ColumnsType, statusData, TableDataType } from '../TableReports';
import CopyIcon from '@/assets/icons/copy-icon.svg';
import { ColumnType } from 'antd/es/table';
import { Button, Modal, Tag, Tooltip } from 'antd';

export type DetailsModalElementProps = {
   activeReportData: TableDataType;
   tableColumns: ColumnsType;
   isModalOpen: boolean;
   handleOnCancel: () => void;
   showNotification: (message: string, duration?: number) => void;
};

const DetailsModalElement = ({
   activeReportData,
   tableColumns,
   isModalOpen,
   handleOnCancel,
   showNotification,
}: DetailsModalElementProps): ReactElement<DetailsModalElementProps> => {
   const { status, ...restActiveReportData } = activeReportData;

   const detailsElement = (
      <>
         <p className='mt-3 mb-7'>
            <Tag color={statusData[status].color} className='mr-0'>
               {statusData[status].text}
            </Tag>
         </p>

         {Object.entries(restActiveReportData).map(([objectKey, value]) => {
            if (value === null) {
               return null;
            }

            const columnData = tableColumns.find(
               (column) =>
                  (column as ColumnType<TableDataType>).dataIndex === objectKey,
            );

            return columnData ? (
               <div
                  key={objectKey}
                  className='details-row mb-3 pb-3 flex justify-between align-middle'
               >
                  <div className='pr-3'>
                     <p className='pr-5 mb-1'>
                        <b>
                           <>{columnData.title}:</>
                        </b>
                     </p>

                     <p>{value}</p>
                  </div>

                  <Tooltip title='Kopiuj wartość'>
                     <Button
                        onClick={async () => {
                           try {
                              await navigator.clipboard.writeText(value);

                              showNotification('Skopiowano');
                           } catch {
                              showNotification('Błąd kopiowania');
                           }
                        }}
                        size='large'
                        className='mt-1'
                        icon={<CopyIcon className='w-5' />}
                     />
                  </Tooltip>
               </div>
            ) : null;
         })}
      </>
   );

   return (
      <Modal
         title={
            <p className='text-2xl'>{`Raport ${activeReportData?.caseSign}`}</p>
         }
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
