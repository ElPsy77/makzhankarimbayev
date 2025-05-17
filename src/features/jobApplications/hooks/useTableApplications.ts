import { Dispatch, SetStateAction, useState } from 'react';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useQueryClient } from 'react-query';
import { getFilteredTableData } from '../helpers/getFilteredTableData';
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

const fetchAcceptedApplications = async () => {
   const response = await fetch('/api/job-applications?status=1');
   const data = await response.json();
   return data;
};

export const useTableApplications = (
   jobApplications: TableDataType[],
   filteredInfo: Record<string, FilterValue | null>,
   sortedInfo: SorterResult<TableDataType>,
): TableApplicationsHookResult => {
   const queryClient = useQueryClient(); // Переместили вызов внутрь хука

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
      financialExpectations: `${application.financialExpectations} ₸`,
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
