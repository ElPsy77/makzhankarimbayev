import { RcFile } from 'antd/lib/upload';

export const checkIsUploadFileExist = (
   prevUploadFiles: RcFile[],
   file: RcFile,
): boolean => {
   const isFileExist = prevUploadFiles.find(
      (prevFile) => prevFile.name === file.name,
   );

   return !!isFileExist;
};
