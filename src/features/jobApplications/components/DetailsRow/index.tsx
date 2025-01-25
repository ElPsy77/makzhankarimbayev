import { ReactElement } from 'react';
import { ColumnsType, ColumnType } from 'antd/lib/table';

import { normalizeDetailRowValue } from '../../helpers/normalizeDetailRowValue';
import { TableDataType } from '../../types';
import CopyButton from '../CopyButton';

type DetailsRowProps = {
   detailKey: string;
   value: string;
   tableColumns: ColumnsType;
};

const DetailsRow = ({
   detailKey,
   value,
   tableColumns,
}: DetailsRowProps): ReactElement<DetailsRowProps> | null => {
   let convertedValue = normalizeDetailRowValue(detailKey, value);

   const currentColumnData = tableColumns.find(
      (column) => (column as ColumnType<TableDataType>).dataIndex === detailKey,
   );

   if (!currentColumnData) {
      return null;
   }

   return (
      <div className='details-row mb-3 pb-3 flex justify-between align-middle'>
         <div className='pr-3'>
            <p className='pr-5 mb-1'>
               <b>
                  <>{currentColumnData.title}:</>
               </b>
            </p>

            <p>{convertedValue}</p>
         </div>

         <CopyButton value={convertedValue} />
      </div>
   );
};

export default DetailsRow;
