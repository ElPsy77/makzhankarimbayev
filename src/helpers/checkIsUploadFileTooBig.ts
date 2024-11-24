import { RcFile } from 'antd/lib/upload';

const maxSingleFileSize = 3 * 1024 * 1024; // 3 MB

export const checkIsUploadFileTooBig = (file: RcFile): boolean =>
   file.size > maxSingleFileSize;
