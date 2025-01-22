import { ReactElement } from 'react';
import { Tag } from 'antd';

export type StatusDataType = {
   text: string;
   color: string;
   isAccepted: boolean;
};

export const statusData: StatusDataType[] = [
   { text: 'New', color: 'magenta', isAccepted: false },
   { text: 'Accepted', color: 'success', isAccepted: true },
];

type StatusTagProps = {
   status: number;
};

const StatusTag = ({
   status,
}: StatusTagProps): ReactElement<StatusTagProps> | null => {
   if (!statusData[status]) {
      return null;
   }

   return (
      <Tag color={statusData[status].color} className='mr-0'>
         {statusData[status].text}
      </Tag>
   );
};

export default StatusTag;
