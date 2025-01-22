import { JobApplicationDataWithId } from '@/types';
import { GetProp, TableProps } from 'antd';

export type TableDataType = Omit<
   JobApplicationDataWithId,
   'financialExpectations'
> & {
   financialExpectations: number | string;
};

export type DataIndex = keyof TableDataType;

export type ColumnsType = GetProp<TableProps<TableDataType>, 'columns'>;

export enum TABLE_SEGMENTED_OPTIONS {
   ACTUAL = 'Actual',
   ACCEPTED = 'Accepted',
}
