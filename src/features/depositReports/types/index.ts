import { GetProp, TableProps } from 'antd';

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

export type DataIndex = keyof TableDataType;

export type ColumnsType = GetProp<TableProps<TableDataType>, 'columns'>;

export enum TABLE_SEGMENTED_OPTIONS {
   ACTUAL = 'Aktualne',
   ARCHIVE = 'Archiwum',
}
