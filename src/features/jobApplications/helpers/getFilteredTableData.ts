import { statusData } from '../components/StatusTag';
import { TableDataType } from '../types';

export const getFilteredTableData = (
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
