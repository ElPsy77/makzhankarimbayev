import { TableColumnType } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FilterDropdownSearchElement from '../components/FilterDropdownSearchElement';
import { DataIndex, TableDataType } from '../types';

export const getColumnSearchProps = (
   dataIndex: DataIndex,
): TableColumnType<TableDataType> => ({
   filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
   }) => (
      <FilterDropdownSearchElement
         setSelectedKeys={setSelectedKeys}
         selectedKeys={selectedKeys}
         confirm={confirm}
         clearFilters={clearFilters}
         close={close}
      />
   ),

   filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
   ),

   onFilter: (value, record) => {
      const currentRecord = record[dataIndex];

      if (typeof currentRecord === 'string') {
         return currentRecord
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase());
      }

      return false;
   },
});
