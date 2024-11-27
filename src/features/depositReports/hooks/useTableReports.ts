import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { statusData } from '../components/StatusTag';
import { ColumnsType, TableDataType } from '../types';
import { useTableColumns } from './useTableColumnts';

type TableReportsHookResult = {
   isArchiveVisible: boolean;
   isDetailsModalOpen: boolean;
   activeReportData: TableDataType | null;
   tableColumns: ColumnsType;
   actualTableData: TableDataType[];
   archiveTableData: TableDataType[];
   setIsArchiveVisible: Dispatch<SetStateAction<boolean>>;
   closeDetailsModal: () => void;
};

const getFilteredTableData = (
   tableData: TableDataType[],
   isArchive: boolean,
): TableDataType[] => {
   const filteredTableData = tableData.filter((report) =>
      statusData[report.status]
         ? statusData[report.status].isArchive === isArchive
         : false,
   );

   const sortedTableData = filteredTableData.sort((reportA, reportB) => {
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

   return sortedTableData;
};

export const useTableReports = (
   depositReports: TableDataType[],
   filteredInfo: Record<string, FilterValue | null>,
   sortedInfo: SorterResult<TableDataType>,
): TableReportsHookResult => {
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const [activeReportData, setActiveReportData] =
      useState<TableDataType | null>(null);

   const [isArchiveVisible, setIsArchiveVisible] = useState<boolean>(false);

   const openDetailsModal = () => {
      setIsDetailsModalOpen(true);
   };

   const closeDetailsModal = () => {
      setIsDetailsModalOpen(false);
   };

   const { tableColumns } = useTableColumns(
      filteredInfo,
      sortedInfo,
      isArchiveVisible,
      (record) => {
         setActiveReportData(record);
         openDetailsModal();
      },
   );

   const tableData = depositReports.map((report) => ({
      ...report,
      phone: `+48 ${report.phone}`,
      offerDeadline: new Date(report.offerDeadline).toLocaleDateString(),
      depositPrice: `${report.depositPrice} zł`,
      contractValue: `${report.contractValue} zł`,
      caseSign: !report.caseSign ? '-' : report.caseSign,
      consortiumStatus: !report.consortiumStatus
         ? '-'
         : report.consortiumStatus,
   }));

   const actualTableData = getFilteredTableData(tableData, false);

   const archiveTableData = getFilteredTableData(tableData, true);

   return {
      isArchiveVisible,
      isDetailsModalOpen,
      activeReportData,
      tableColumns,
      actualTableData,
      archiveTableData,
      setIsArchiveVisible,
      closeDetailsModal,
   };
};
