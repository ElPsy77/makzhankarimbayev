import { checkIsUploadFileExist } from '@/helpers/checkIsUploadFileExist';
import { checkIsUploadFileHasInvalidExtension } from '@/helpers/checkIsUploadFileHasInvalidExtension';
import { checkIsUploadFileTooBig } from '@/helpers/checkIsUploadFileTooBig';
import { checkIsUploadTotalFilesSizeTooBig } from '@/helpers/checkIsUploadTotalFilesSizeTooBig';
import { FormInstance } from 'antd/lib/form/Form';
import Upload, { RcFile } from 'antd/lib/upload';

type UploadHookResult = {
   validateUploadFiles: (_: RcFile, fileList: RcFile[]) => string | boolean;
   resetUploadFiles: () => void;
};

export const useUpload = (formRef: FormInstance): UploadHookResult => {
   const validateUploadFiles = (
      _: RcFile,
      fileList: RcFile[],
   ): string | boolean => {
      const uploadErrors: string[] = [];

      const prevUpload = formRef.getFieldValue('files');

      const prevUploadFiles: RcFile[] = prevUpload ? prevUpload.fileList : [];

      fileList.forEach((file) => {
         if (checkIsUploadFileExist(prevUploadFiles, file)) {
            uploadErrors.push(`Plik "${file.name}" jest już dodany`);
         }

         if (checkIsUploadFileTooBig(file)) {
            uploadErrors.push(
               `Rozmiar pliku "${file.name}" jest zbyt duży (max. 1MB)`,
            );
         }

         if (checkIsUploadFileHasInvalidExtension(file)) {
            uploadErrors.push(
               `Plik "${file.name}" ma nieprawidłowe rozszerzenie`,
            );
         }
      });

      if (checkIsUploadTotalFilesSizeTooBig(prevUploadFiles, fileList)) {
         uploadErrors.push(
            'Łączny rozmiar wszystkich plików nie może przekraczać 10MB',
         );
      }

      if (uploadErrors.length > 0) {
         formRef.setFields([
            {
               name: 'files',
               errors: uploadErrors,
            },
         ]);

         return Upload.LIST_IGNORE;
      }

      formRef.setFields([
         {
            name: 'files',
            errors: [],
         },
      ]);

      return true;
   };

   const resetUploadFiles = (): void => {
      formRef.setFields([
         {
            name: 'files',
            errors: [],
         },
      ]);
   };

   return {
      validateUploadFiles,
      resetUploadFiles,
   };
};
