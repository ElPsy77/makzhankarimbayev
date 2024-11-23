import { ReactElement } from 'react';
import { Tag } from 'antd';
import { statusData } from '../TableReports';

type StatusTagProps = {
   status: number;
};

const StatusTag = ({
   status,
}: StatusTagProps): ReactElement<StatusTagProps> => (
   <Tag color={statusData[status].color} className='mr-0'>
      {statusData[status].text}
   </Tag>
);

export default StatusTag;
