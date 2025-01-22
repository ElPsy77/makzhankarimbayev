import { RcFile } from 'antd/lib/upload';

const maxTotalFilesSize = 3 * 1024 * 1024; // 3 MB

export const checkIsUploadTotalFilesSizeTooBig = (
   fileList: RcFile[],
): boolean => {
   const uploadFilesSize = fileList.reduce(
      (totalSize, file) => totalSize + file.size,
      0,
   );

   return uploadFilesSize > maxTotalFilesSize;
};
