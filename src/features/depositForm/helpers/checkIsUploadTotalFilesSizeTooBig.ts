import { RcFile } from 'antd/lib/upload';

const maxTotalFilesSize = 10 * 1024 * 1024; // 10 MB

export const checkIsUploadTotalFilesSizeTooBig = (
   prevUploadFiles: RcFile[],
   fileList: RcFile[],
): boolean => {
   const prevUploadFilesSize = prevUploadFiles.reduce(
      (totalSize, file) => totalSize + file.size,
      0,
   );

   const totalFilesSize = fileList.reduce(
      (totalSize, file) => totalSize + file.size,
      prevUploadFilesSize,
   );

   return totalFilesSize > maxTotalFilesSize;
};
