import React, { ReactElement, useState } from 'react';
import { Button, Segmented, Table } from 'antd';
import DetailsModalElement from '../DetailsModalElement';
import { FilterValue } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { DepositReportModel } from '@/services/db/getAllDepositReportsDb';
import { TableDataType, TABLE_SEGMENTED_OPTIONS } from '../../types';
import { useTableColumns } from '../../hooks/useTableColumnts';

export type TableReportsProps = {
   depositReports: DepositReportModel[];
};

type StatusDataType = {
   text: string;
   color: string;
   isArchive: boolean;
};

export const statusData: StatusDataType[] = [
   { text: 'Nowy', color: 'magenta', isArchive: false },
   { text: 'Wprowadzone', color: 'success', isArchive: true },
];

const TableReports = ({
   depositReports,
}: TableReportsProps): ReactElement<TableReportsProps> => {
   const [activeReportData, setActiveReportData] =
      useState<TableDataType | null>(null);

   const [isArchiveVisible, setIsArchiveVisible] = useState<boolean>(false);

   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const [filteredInfo, setFilteredInfo] = useState<
      Record<string, FilterValue | null>
   >({});

   const [sortedInfo, setSortedInfo] = useState<SorterResult<TableDataType>>(
      {},
   );

   const { tableColumns } = useTableColumns(
      filteredInfo,
      sortedInfo,
      isArchiveVisible,
      (record) => {
         setActiveReportData(record);
         setIsDetailsModalOpen(true);
      },
   );

   const handleTableOnChange = (
      _: any,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TableDataType> | SorterResult<TableDataType>[],
   ) => {
      setFilteredInfo(filters);
      setSortedInfo(Array.isArray(sorter) ? sorter[0] : sorter);
   };

   const clearAll = () => {
      setFilteredInfo({});
      setSortedInfo({});
   };

   const tableData = depositReports.map((report) => ({
      ...report,
      phone: `+48 ${report.phone}`,
      offerDeadline: new Date(report.offerDeadline).toLocaleDateString(),
      depositPrice: `${report.depositPrice} zł`,
      contractValue: `${report.contractValue} zł`,
      caseSign: report.caseSign === null ? '-' : report.caseSign,
   }));

   const actualTableData = tableData
      .filter((report) =>
         statusData[report.status]
            ? !statusData[report.status].isArchive
            : false,
      )
      .sort((reportA, reportB) => {
         const dataAValue = new Date(reportA.createdDate).getTime();
         const dataBValue = new Date(reportB.createdDate).getTime();

         if (dataAValue < dataBValue) {
            return 1;
         }

         if (dataAValue > dataBValue) {
            return -1;
         }

         return 0;
      });

   const archivedTableData = tableData
      .filter((report) => statusData[report.status]?.isArchive)
      .sort((reportA, reportB) => {
         if (reportA.closedDate && reportB.closedDate) {
            const dataAValue = new Date(reportA.closedDate).getTime();
            const dataBValue = new Date(reportB.closedDate).getTime();

            if (dataAValue < dataBValue) {
               return 1;
            }

            if (dataAValue > dataBValue) {
               return -1;
            }
         }

         return 0;
      });

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

            <Button onClick={clearAll}>Wyczyść filtry</Button>
         </div>

         <Table<TableDataType>
            columns={tableColumns}
            dataSource={isArchiveVisible ? archivedTableData : actualTableData}
            pagination={false}
            onChange={handleTableOnChange}
            tableLayout='auto'
            virtual
            bordered
         />

         {activeReportData ? (
            <DetailsModalElement
               activeReportData={activeReportData}
               tableColumns={tableColumns}
               isModalOpen={isDetailsModalOpen}
               handleOnCancel={() => setIsDetailsModalOpen(false)}
            />
         ) : null}
      </>
   );
};

export default TableReports;
