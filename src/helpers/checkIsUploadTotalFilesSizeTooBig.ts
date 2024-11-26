import { RcFile } from 'antd/lib/upload';

const maxTotalFilesSize = 10 * 1024 * 1024; // 10 MB

export const checkIsUploadTotalFilesSizeTooBig = (
   fileList: RcFile[],
): boolean => {
   const uploadFilesSize = fileList.reduce(
      (totalSize, file) => totalSize + file.size,
      0,
   );

   return uploadFilesSize > maxTotalFilesSize;
};
