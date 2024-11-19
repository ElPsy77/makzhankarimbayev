import React, { ReactElement, useContext, useState } from 'react';
import {
   Button,
   GetProp,
   Segmented,
   Table,
   TableProps,
   Tag,
   Dropdown,
   MenuProps,
   Popconfirm,
   TableColumnType,
   Input,
   Space,
   Tooltip,
} from 'antd';
import DetailsModalElement from '../DetailsModalElement';
import { useQueryClient } from 'react-query';
import {
   SearchOutlined,
   DeleteOutlined,
   EditOutlined,
   PlusOutlined,
} from '@ant-design/icons';
import { FilterValue } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { DepositReportModel } from '@/services/db/getAllDepositReportsDb';
import { NotificationContext } from '@/providers/notificationProvider';

export type TableReportsProps = {
   depositReports: DepositReportModel[];
};

export type TableDataType = {
   id: string;
   companyName: string;
   email: string;
   phone: string;
   offerDeadline: string;
   depositPrice: string;
   contractValue: string;
   consortiumStatus: string;
   warrantyPeriod: string;
   caseSign: string;
   uploadNames: string | null;
   status: number;
   createdDate: string;
   closedDate: string | null;
};

type DataIndex = keyof TableDataType;

export type ColumnsType = GetProp<TableProps<TableDataType>, 'columns'>;

enum TABLE_SEGMENTED_OPTIONS {
   ACTUAL = 'Aktualne',
   ARCHIVE = 'Archiwum',
}

export const statusData = [
   { text: 'Nowy', color: 'magenta' },
   { text: 'W toku', color: 'processing' },
   { text: 'Gotowe', color: 'success' },
];

const TableReports = ({
   depositReports,
}: TableReportsProps): ReactElement<TableReportsProps> => {
   const queryClient = useQueryClient();

   const { showNotification } = useContext(NotificationContext);

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

   const downloadFile = async (fileName: string) => {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploads/${fileName}`,
      );

      if (response.ok) {
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.style.display = 'none';
         a.href = url;
         a.download = fileName;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
      } else {
         alert('Wystąpił błąd podczas pobierania pliku');
      }
   };

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

   const getColumnSearchProps = (
      dataIndex: DataIndex,
   ): TableColumnType<TableDataType> => ({
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
         close,
      }) => {
         return (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
               <Input
                  placeholder={'Wyszukaj'}
                  value={selectedKeys[0]}
                  onChange={(e) => {
                     setSelectedKeys(e.target.value ? [e.target.value] : []);
                     confirm({ closeDropdown: false });
                  }}
                  onPressEnter={close}
                  style={{ marginBottom: 8, display: 'block' }}
               />

               <Space className='flex justify-end'>
                  <Button
                     size='small'
                     onClick={() => {
                        if (clearFilters) {
                           clearFilters();
                           confirm({ closeDropdown: false });
                           close();
                        }
                     }}
                  >
                     Reset
                  </Button>
                  <Button
                     size='small'
                     onClick={() => {
                        close();
                     }}
                  >
                     Zamknij
                  </Button>
               </Space>
            </div>
         );
      },
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

   const handleUpdateUserStatus = async (id: string, status: number) => {
      const isDone = status === 2;

      try {
         await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports/${id}`,
            {
               method: 'PATCH',
               body: JSON.stringify({
                  status,
                  closedDate: isDone ? new Date() : null,
               }),
            },
         );

         await queryClient.invalidateQueries(['depositReports']);

         showNotification(
            isDone
               ? 'Raport został przeniesiony do archiwum'
               : 'Status zaktualizowany',
            'success',
            2,
         );
      } catch (err) {
         console.error(err);
      }
   };

   const handleRemoveUser = async (id: string) => {
      try {
         await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports/${id}`,
            {
               method: 'DELETE',
            },
         );

         await queryClient.invalidateQueries(['depositReports']);

         showNotification('Raport usunięty', 'success');
      } catch (err) {
         console.error(err);
      }
   };

   const getStatusDropdownButtonItems = (
      reportId: string,
   ): MenuProps['items'] =>
      statusData.map((status, index) => ({
         key: index,
         label: status.text,
         onClick: () => handleUpdateUserStatus(reportId, index),
      }));

   const tableColumns: ColumnsType = [
      {
         title: 'Nazwa firmy',
         dataIndex: 'companyName',
         sorter: (a, b) => {
            if (a.companyName < b.companyName) {
               return -1;
            }

            if (a.companyName > b.companyName) {
               return 1;
            }

            return 0;
         },
         filteredValue: filteredInfo.companyName || null,
         sortOrder:
            sortedInfo.field === 'companyName' ? sortedInfo.order : null,
         ...getColumnSearchProps('companyName'),
         render: (_, record) => (
            <div className='flex items-center'>
               <Tooltip title='Zobacz szczegóły'>
                  <Button
                     className='text-l px-3 py-5 mr-3'
                     onClick={() => {
                        setActiveReportData(record);
                        setIsDetailsModalOpen(true);
                     }}
                  >
                     <PlusOutlined />
                  </Button>
               </Tooltip>

               {record.companyName}
            </div>
         ),
      },
      {
         title: 'Status',
         dataIndex: 'status',
         filters: statusData.map((status, index) => ({
            text: status.text,
            value: index,
         })),
         filterMode: 'menu',
         onFilter: (value, record) => record.status === value,
         filteredValue: filteredInfo.status || null,
         render: (_, record) => (
            <Tag color={statusData[record.status].color} className='mr-0'>
               {statusData[record.status].text}
            </Tag>
         ),
      },
      {
         title: 'Znak sprawy / numer postępowania',
         dataIndex: 'caseSign',
         filteredValue: filteredInfo.caseSign || null,
         ...getColumnSearchProps('caseSign'),
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
         hidden: true,
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
         sorter: (a, b) => {
            const dataAValue = new Date(a.createdDate).getTime();
            const dataBValue = new Date(b.createdDate).getTime();

            if (dataAValue < dataBValue) {
               return -1;
            }

            if (dataAValue > dataBValue) {
               return 1;
            }

            return 0;
         },
         sortOrder:
            sortedInfo.field === 'createdDate' ? sortedInfo.order : null,
         hidden: isArchiveVisible,
         render: (_, record) => new Date(record.createdDate).toLocaleString(),
      },
      {
         title: 'Data zamknięcia',
         dataIndex: 'closedDate',
         sorter: (a, b) => {
            if (a.closedDate && b.closedDate) {
               const dataAValue = new Date(a.closedDate).getTime();
               const dataBValue = new Date(b.closedDate).getTime();

               if (dataAValue < dataBValue) {
                  return -1;
               }

               if (dataAValue > dataBValue) {
                  return 1;
               }
            }

            return 0;
         },
         sortOrder: sortedInfo.field === 'closedDate' ? sortedInfo.order : null,
         hidden: !isArchiveVisible,
         render: (_, record) =>
            record.closedDate
               ? new Date(record.closedDate).toLocaleString()
               : null,
      },
      {
         title: 'Załączniki',
         render: (_, record) => {
            const filesNames = new String(record.uploadNames).split(',');

            const filteredFilesNames = filesNames.filter(
               (fileName) => fileName !== 'null',
            );

            const filesElements = filteredFilesNames.map((fileName) => (
               <Tooltip key={fileName} title='Pobierz plik'>
                  <Button
                     onClick={() => downloadFile(fileName)}
                     className='mb-3 block'
                  >
                     {fileName}
                  </Button>
               </Tooltip>
            ));

            return <>{filesElements}</>;
         },
      },
      {
         title: 'Akcje',
         width: 135,
         render: (_, record) => (
            <div className='flex'>
               <Dropdown
                  menu={{
                     items: getStatusDropdownButtonItems(record.id),
                  }}
                  trigger={['click']}
                  placement='bottomRight'
               >
                  <Tooltip title='Zmień status'>
                     <Button className='text-lg px-3 py-5 mr-3'>
                        <EditOutlined />
                     </Button>
                  </Tooltip>
               </Dropdown>

               <Popconfirm
                  title='Uwaga! Usuwasz raport'
                  description={
                     <>
                        Czy jesteś pewny ze chcesz usunąć wybrany raport?
                        <br />
                        Raport ten NIE zostanie przeniesiony do archiwum
                     </>
                  }
                  onConfirm={() => handleRemoveUser(record.id)}
                  okText='Tak'
                  cancelText='Nie'
                  placement='topRight'
               >
                  <Tooltip title='Usuń raport'>
                     <Button className='text-lg px-3 py-5'>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
            </div>
         ),
      },
   ];

   const tableData = depositReports.map((report) => ({
      ...report,
      phone: `+48 ${report.phone}`,
      offerDeadline: new Date(report.offerDeadline).toLocaleDateString(),
      depositPrice: `${report.depositPrice} zł`,
      contractValue: `${report.contractValue} zł`,
      warrantyPeriod: new Date(report.warrantyPeriod).toLocaleDateString(),
   }));

   const actualTableData = tableData
      .filter((report) => report.status !== 2)
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
      .filter((report) => report.status === 2)
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
