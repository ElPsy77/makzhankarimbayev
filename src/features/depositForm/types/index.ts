import { DepositReportData } from '@/types';
import { UploadFile } from 'antd';

export type DepositReportFormData = {
   files?: {
      fileList: UploadFile[];
   };
} & Omit<DepositReportData, 'fileUrl'>;

export enum FormResultStatus {
   SUCCESSS = 'success',
   ERROR = 'error',
}
