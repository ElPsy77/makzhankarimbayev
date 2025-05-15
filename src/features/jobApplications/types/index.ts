import { GetProp, TableProps } from 'antd';
import { JobApplicationDataWithId } from '@/types';

// Тип данных для таблицы, где "финансовые ожидания" могут быть числом или строкой
export type TableDataType = Omit<
   JobApplicationDataWithId,
   'financialExpectations' // исключаем оригинальное поле
> & {
   financialExpectations: number | string; // заменяем его на новый тип
};

// Тип для ключей из TableDataType
export type DataIndex = keyof TableDataType;

// Тип для колонок таблицы
export type ColumnsType = GetProp<TableProps<TableDataType>, 'columns'>;

// Перечисление (enum) для фильтрации таблицы по статусам
export enum TABLE_SEGMENTED_OPTIONS {
   NEW = 'Новая',        // Заявка новая
   ACCEPTED = 'Принята', // Заявка принята
}
