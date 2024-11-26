import { RcFile } from 'antd/lib/upload';

export const checkIsUploadFileExist = (
   fileList: RcFile[],
   file: RcFile,
): boolean => {
   const fileName = file.name;

   const duplicatesArray = fileList.filter((item) => item.name === fileName);

   const isDuplicated = duplicatesArray.length > 1;

   return isDuplicated;
};
