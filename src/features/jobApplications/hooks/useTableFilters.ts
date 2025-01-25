import { useState } from 'react';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';

import { TableDataType } from '../types';

type TableFiltersHookResult = {
   filteredInfo: Record<string, FilterValue | null>;
   sortedInfo: SorterResult<TableDataType>;
   handleChangeFiltersAndSort: (
      _: any,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TableDataType> | SorterResult<TableDataType>[],
   ) => void;
   clearFiltersAndSort: () => void;
};

export const useTableFilters = (): TableFiltersHookResult => {
   const [filteredInfo, setFilteredInfo] = useState<
      Record<string, FilterValue | null>
   >({});

   const [sortedInfo, setSortedInfo] = useState<SorterResult<TableDataType>>(
      {},
   );

   const handleChangeFiltersAndSort = (
      _: any,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TableDataType> | SorterResult<TableDataType>[],
   ) => {
      setFilteredInfo(filters);
      setSortedInfo(Array.isArray(sorter) ? sorter[0] : sorter);
   };

   const clearFiltersAndSort = () => {
      setFilteredInfo({});
      setSortedInfo({});
   };

   return {
      filteredInfo,
      sortedInfo,
      handleChangeFiltersAndSort,
      clearFiltersAndSort,
   };
};
