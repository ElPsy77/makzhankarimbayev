import React, { ReactElement } from 'react';
import { Button, Segmented, Table } from 'antd';
import { useTableFilters } from '../../hooks/useTableFilters';
import { useTableApplications } from '../../hooks/useTableApplications';
import { TableDataType, TABLE_SEGMENTED_OPTIONS } from '../../types';
import DetailsModalElement from '../DetailsModalElement';

export type TableApplicationsProps = {
   jobApplications: TableDataType[];
};

const TableApplications = ({
   jobApplications,
}: TableApplicationsProps): ReactElement<TableApplicationsProps> => {
   const {
      filteredInfo,
      sortedInfo,
      handleChangeFiltersAndSort,
      clearFiltersAndSort,
   } = useTableFilters();

   const {
      isAcceptedVisible,
      isDetailsModalOpen,
      activeApplicationData,
      tableColumns,
      actualTableData,
      acceptedTableData,
      setIsAcceptedVisible,
      closeDetailsModal,
   } = useTableApplications(jobApplications, filteredInfo, sortedInfo);

   return (
      <>
         <div className='flex justify-between'>
            <Segmented
               className='mb-3'
               options={[
                  TABLE_SEGMENTED_OPTIONS.ACTUAL,
                  TABLE_SEGMENTED_OPTIONS.ACCEPTED,
               ]}
               onChange={(value) =>
                  setIsAcceptedVisible(
                     value === TABLE_SEGMENTED_OPTIONS.ACCEPTED,
                  )
               }
            />

            <Button onClick={clearFiltersAndSort}>Clear filters</Button>
         </div>

         <Table<TableDataType>
            columns={tableColumns}
            dataSource={isAcceptedVisible ? acceptedTableData : actualTableData}
            pagination={{ position: ['bottomRight'] }}
            onChange={handleChangeFiltersAndSort}
            tableLayout='auto'
            virtual
            bordered
         />

         {activeApplicationData ? (
            <DetailsModalElement
               activeJobApplicationData={activeApplicationData}
               tableColumns={tableColumns}
               isModalOpen={isDetailsModalOpen}
               handleOnCancel={closeDetailsModal}
            />
         ) : null}
      </>
   );
};

export default TableApplications;
