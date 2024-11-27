import React, { ReactElement } from 'react';
import { Button, Segmented, Table } from 'antd';
import DetailsModalElement from '../DetailsModalElement';
import { TableDataType, TABLE_SEGMENTED_OPTIONS } from '../../types';
import { useTableFilters } from '../../hooks/useTableFilters';
import { useTableReports } from '../../hooks/useTableReports';

export type TableReportsProps = {
   depositReports: TableDataType[];
};

const TableReports = ({
   depositReports,
}: TableReportsProps): ReactElement<TableReportsProps> => {
   const {
      filteredInfo,
      sortedInfo,
      handleChangeFiltersAndSort,
      clearFiltersAndSort,
   } = useTableFilters();

   const {
      isArchiveVisible,
      isDetailsModalOpen,
      activeReportData,
      tableColumns,
      actualTableData,
      archiveTableData,
      setIsArchiveVisible,
      closeDetailsModal,
   } = useTableReports(depositReports, filteredInfo, sortedInfo);

   return (
      <>
         <div className='flex justify-between'>
            <Segmented
               className='mb-3'
               options={[
                  TABLE_SEGMENTED_OPTIONS.ACTUAL,
                  TABLE_SEGMENTED_OPTIONS.ARCHIVE,
               ]}
               onChange={(value) =>
                  setIsArchiveVisible(value === TABLE_SEGMENTED_OPTIONS.ARCHIVE)
               }
            />

            <Button onClick={clearFiltersAndSort}>Wyczyść filtry</Button>
         </div>

         <Table<TableDataType>
            columns={tableColumns}
            dataSource={isArchiveVisible ? archiveTableData : actualTableData}
            pagination={{ position: ['bottomRight'] }}
            onChange={handleChangeFiltersAndSort}
            tableLayout='auto'
            virtual
            bordered
         />

         {activeReportData ? (
            <DetailsModalElement
               activeReportData={activeReportData}
               tableColumns={tableColumns}
               isModalOpen={isDetailsModalOpen}
               handleOnCancel={closeDetailsModal}
            />
         ) : null}
      </>
   );
};

export default TableReports;
