import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { statusData } from '../components/StatusTag';
import { ColumnsType, TableDataType } from '../types';
import { useTableColumns } from './useTableColumns';

type TableApplicationsHookResult = {
   isAcceptedVisible: boolean;
   isDetailsModalOpen: boolean;
   activeApplicationData: TableDataType | null;
   tableColumns: ColumnsType;
   newTableData: TableDataType[];
   acceptedTableData: TableDataType[];
   setIsAcceptedVisible: Dispatch<SetStateAction<boolean>>;
   closeDetailsModal: () => void;
};

const getFilteredTableData = (
   tableData: TableDataType[],
   isAccepted: boolean,
): TableDataType[] => {
   const filteredTableData = tableData.filter((tableRecord) =>
      statusData[tableRecord.status]
         ? statusData[tableRecord.status].isAccepted === isAccepted
         : false,
   );

   const sortedTableData = filteredTableData.sort((recordA, recordB) => {
      if (recordA.closedDate && recordB.closedDate) {
         const dataAValue = new Date(recordA.closedDate).getTime();
         const dataBValue = new Date(recordB.closedDate).getTime();

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

export const useTableApplications = (
   jobApplications: TableDataType[],
   filteredInfo: Record<string, FilterValue | null>,
   sortedInfo: SorterResult<TableDataType>,
): TableApplicationsHookResult => {
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const [activeApplicationData, setActiveApplicationData] =
      useState<TableDataType | null>(null);

   const [isAcceptedVisible, setIsAcceptedVisible] = useState<boolean>(false);

   const openDetailsModal = () => {
      setIsDetailsModalOpen(true);
   };

   const closeDetailsModal = () => {
      setIsDetailsModalOpen(false);
   };

   const { tableColumns } = useTableColumns(
      filteredInfo,
      sortedInfo,
      isAcceptedVisible,
      (record) => {
         setActiveApplicationData(record);
         openDetailsModal();
      },
   );

   const tableData = jobApplications.map((application) => ({
      ...application,
      phone: `+48 ${application.phone}`,
      startJobDate: new Date(application.startJobDate).toLocaleDateString(),
      financialExpectations: `${application.financialExpectations} zł`,
      lastCompany: !application.lastCompany ? '-' : application.lastCompany,
      employeeName: !application.employeeName ? '-' : application.employeeName,
   }));

   const newTableData = getFilteredTableData(tableData, false);

   const acceptedTableData = getFilteredTableData(tableData, true);

   return {
      isAcceptedVisible,
      isDetailsModalOpen,
      activeApplicationData,
      tableColumns,
      newTableData,
      acceptedTableData,
      setIsAcceptedVisible,
      closeDetailsModal,
   };
};
