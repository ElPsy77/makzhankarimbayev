import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import DropdownStatusElement from '../components/DropdownStatusElement';
import FilesDownloadButtons from '../components/FilesDownloadButtons';
import NameRow from '../components/NameRow';
import RemoveJobApplicationActionButton from '../components/RemoveJobApplicationActionButton';
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
   isAcceptedVisible: boolean,
   handleNameIconClick: (record: TableDataType) => void,
): TableColumnsResult => {
   const tableColumns: ColumnsType = [
      {
         title: 'Имя',
         dataIndex: 'name',
         sorter: (a, b) => sortTableValues(a.name, b.name),
         filteredValue: filteredInfo.name || null,
         sortOrder: sortedInfo.field === 'name' ? sortedInfo.order : null,
         render: (_, record) => (
            <NameRow
               text={record.name}
               iconOnClick={() => handleNameIconClick(record)}
            />
         ),
         ...getColumnSearchProps('name'),
      },
      {
         title: 'Статус',
         dataIndex: 'status',
         render: (_, record) => <StatusTag status={record.status} />,
      },
      {
         title: 'Город',
         dataIndex: 'town',
         hidden: true,
      },
      {
         title: 'E-mail',
         dataIndex: 'email',
         filteredValue: filteredInfo.email || null,
         ...getColumnSearchProps('email'),
      },
      {
         title: 'Номер телефона',
         dataIndex: 'phone',
      },
      {
         title: 'Самая ранняя возможная дата начала',
         dataIndex: 'startJobDate',
         sorter: (a, b) =>
            sortTableValues(
               new Date(a.startJobDate).getTime(),
               new Date(b.startJobDate).getTime(),
            ),
         sortOrder:
            sortedInfo.field === 'startJobDate' ? sortedInfo.order : null,
         render: (_, record) =>
            new Date(record.startJobDate).toLocaleDateString(),
      },
      {
         title: 'Финансовые ожидания',
         dataIndex: 'financialExpectations',
         hidden: true,
      },
      {
         title: 'Название последней компании',
         dataIndex: 'lastCompany',
         hidden: true,
      },
      {
         title: 'Имя рекомендующего сотрудника',
         dataIndex: 'employeeName',
         hidden: true,
      },
      {
         title: 'Дата создания',
         dataIndex: 'createdDate',
         sorter: (a, b) =>
            sortTableValues(
               new Date(a.createdDate).getTime(),
               new Date(b.createdDate).getTime(),
            ),
         sortOrder:
            sortedInfo.field === 'createdDate' ? sortedInfo.order : null,
         hidden: isAcceptedVisible,
         render: (_, record) => new Date(record.createdDate).toLocaleString(),
      },
      {
         title: 'Дата принятия',
         dataIndex: 'closedDate',
         sorter: (a, b) =>
            sortTableValues(
               new Date(a.closedDate || '').getTime(),
               new Date(b.closedDate || '').getTime(),
            ),
         sortOrder: sortedInfo.field === 'closedDate' ? sortedInfo.order : null,
         hidden: !isAcceptedVisible,
         render: (_, record) =>
            record.closedDate
               ? new Date(record.closedDate).toLocaleString()
               : null,
      },
      {
         title: 'Файлы',
         render: (_, record) =>
            record.uploadNames ? (
               <FilesDownloadButtons uploadNames={record.uploadNames} />
            ) : null,
      },
      {
         title: 'Действия',
         width: 135,
         render: (_, record) => (
            <div className='flex'>
               <DropdownStatusElement jobApplicationId={record.id} />

               <RemoveJobApplicationActionButton
                  jobApplicationId={record.id}
                  uploadFiles={record.uploadNames}
               />
            </div>
         ),
      },
   ];

   return {
      tableColumns,
   };
};
