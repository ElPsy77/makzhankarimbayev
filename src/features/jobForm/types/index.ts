import { UploadFile } from 'antd';
import { JobApplicationData } from '@/types';

export type JobApplicationFormData = {
   files?: {
      fileList: UploadFile[];
   };
} & JobApplicationData;

export enum FormResultStatus {
   SUCCESSS = 'success',
   ERROR = 'error',
}
