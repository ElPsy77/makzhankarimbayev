import { RcFile } from 'antd/lib/upload';

const maxSingleFileSize = 1 * 1024 * 1024; // 1 MB

export const checkIsUploadFileTooBig = (file: RcFile): boolean =>
   file.size > maxSingleFileSize;
