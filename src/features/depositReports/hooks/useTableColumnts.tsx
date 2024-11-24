import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import CompanyNameRow from '../components/CompanyNameRow';
import DropdownStatusElement from '../components/DropdownStatusElement';
import FilesDownloadButtons from '../components/FilesDownloadButtons';
import RemoveUserActionButton from '../components/RemoveUserActionButton';
import StatusTag from '../components/StatusTag';
import { getColumnSearchProps } from '../helpers/getColumnSearchProps';
import { sortTableValues } from '../helpers/sortTableValues';
import { ColumnsType, TableDataType } from '../types';

type TableColumnsResult = {
   tableColumns: ColumnsType;
};

export const useTableColumns = (
   filteredInfo: Record<string, FilterValue | null>,
   sortedInfo: SorterResult<TableDataType>,
   isArchiveVisible: boolean,
   handleCompanyNameIconClick: (record: TableDataType) => void,
): TableColumnsResult => {
   const tableColumns: ColumnsType = [
      {
         title: 'Nazwa firmy',
         dataIndex: 'companyName',
         sorter: (a, b) => sortTableValues(a.companyName, b.companyName),
         filteredValue: filteredInfo.companyName || null,
         sortOrder:
            sortedInfo.field === 'companyName' ? sortedInfo.order : null,
         render: (_, record) => (
            <CompanyNameRow
               text={record.companyName}
               iconOnClick={() => handleCompanyNameIconClick(record)}
            />
         ),
         ...getColumnSearchProps('companyName'),
      },
      {
         title: 'Status',
         dataIndex: 'status',
         render: (_, record) => <StatusTag status={record.status} />,
      },
      {
         title: 'Znak sprawy / link',
         dataIndex: 'caseSign',
         hidden: true,
      },
      {
         title: 'Adres email',
         dataIndex: 'email',
         filteredValue: filteredInfo.email || null,
         ...getColumnSearchProps('email'),
      },
      {
         title: 'Telefon',
         dataIndex: 'phone',
         filteredValue: filteredInfo.phone || null,
         ...getColumnSearchProps('phone'),
      },
      {
         title: 'Termin składania ofert',
         dataIndex: 'offerDeadline',
      },
      {
         title: 'Kwota wadium',
         dataIndex: 'depositPrice',
         hidden: true,
      },
      {
         title: 'Szacunkowa wartość kontraktu',
         dataIndex: 'contractValue',
         hidden: true,
      },
      {
         title: 'Status konsorcjum',
         dataIndex: 'consortiumStatus',
         hidden: true,
      },
      {
         title: 'Okres gwarancji i rękojmi',
         dataIndex: 'warrantyPeriod',
         hidden: true,
      },
      {
         title: 'Data utworzenia',
         dataIndex: 'createdDate',
         sorter: (a, b) =>
            sortTableValues(
               new Date(a.createdDate).getTime(),
               new Date(b.createdDate).getTime(),
            ),
         sortOrder:
            sortedInfo.field === 'createdDate' ? sortedInfo.order : null,
         hidden: isArchiveVisible,
         render: (_, record) => new Date(record.createdDate).toLocaleString(),
      },
      {
         title: 'Data zamknięcia',
         dataIndex: 'closedDate',
         sorter: (a, b) =>
            sortTableValues(
               new Date(a.closedDate || '').getTime(),
               new Date(b.closedDate || '').getTime(),
            ),
         sortOrder: sortedInfo.field === 'closedDate' ? sortedInfo.order : null,
         hidden: !isArchiveVisible,
         render: (_, record) =>
            record.closedDate
               ? new Date(record.closedDate).toLocaleString()
               : null,
      },
      {
         title: 'Załączniki',
         render: (_, record) =>
            record.uploadNames ? (
               <FilesDownloadButtons uploadNames={record.uploadNames} />
            ) : null,
      },
      {
         title: 'Akcje',
         width: 135,
         render: (_, record) => (
            <div className='flex'>
               <DropdownStatusElement userId={record.id} />

               <RemoveUserActionButton userId={record.id} />
            </div>
         ),
      },
   ];

   return {
      tableColumns,
   };
};
