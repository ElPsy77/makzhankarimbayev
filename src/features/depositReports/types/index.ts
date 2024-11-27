import { DepositReportDataWithId } from '@/types';
import { GetProp, TableProps } from 'antd';

export type TableDataType = Omit<
   DepositReportDataWithId,
   'depositPrice' | 'contractValue'
> & {
   depositPrice: number | string;
   contractValue: number | string;
};

export type DataIndex = keyof TableDataType;

export type ColumnsType = GetProp<TableProps<TableDataType>, 'columns'>;

export enum TABLE_SEGMENTED_OPTIONS {
   ACTUAL = 'Aktualne',
   ARCHIVE = 'Archiwum',
}
