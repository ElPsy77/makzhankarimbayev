import { DepositReportFormData } from '../hooks/useDepositForm';

export const getUploadsFilesAsFormData = (
   files: DepositReportFormData['files'],
): FormData => {
   const formData = new FormData();

   if (!files) {
      return formData;
   }

   files.fileList.forEach((file) => {
      if (file.originFileObj) {
         formData.append('files', file.originFileObj);
      }
   });

   return formData;
};
