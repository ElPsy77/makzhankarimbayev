import { FormInstance } from 'antd/lib/form/Form';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';

import { checkIsUploadFileExist } from '@/helpers/checkIsUploadFileExist';
import { checkIsUploadFileHasInvalidExtension } from '@/helpers/checkIsUploadFileHasInvalidExtension';
import { checkIsUploadFileTooBig } from '@/helpers/checkIsUploadFileTooBig';
import { checkIsUploadTotalFilesSizeTooBig } from '@/helpers/checkIsUploadTotalFilesSizeTooBig';

type UploadHookResult = {
   validateUploadFiles: (info: UploadChangeParam<UploadFile>) => void;
   resetUploadFiles: () => void;
};

export const useUpload = (formRef: FormInstance): UploadHookResult => {
   const resetUploadFiles = (): void => {
      formRef.setFields([
         {
            name: 'files',
            errors: [],
         },
      ]);
   };

   const validateUploadFiles = (info: UploadChangeParam<UploadFile>): void => {
      const uploadErrors: string[] = [];

      const fileList: RcFile[] = info.fileList
         .map((uploadFile) => uploadFile.originFileObj || null)
         .filter(Boolean) as RcFile[];

      fileList.forEach((file) => {
         if (checkIsUploadFileExist(fileList, file)) {
            uploadErrors.push(`Plik "${file.name}" jest już dodany`);
         }

         if (checkIsUploadFileTooBig(file)) {
            uploadErrors.push(
               `Rozmiar pliku "${file.name}" jest zbyt duży (max. 3MB)`,
            );
         }

         if (checkIsUploadFileHasInvalidExtension(file)) {
            uploadErrors.push(
               `Plik "${file.name}" ma nieprawidłowe rozszerzenie`,
            );
         }
      });

      if (checkIsUploadTotalFilesSizeTooBig(fileList)) {
         uploadErrors.push(
            'Łączny rozmiar wszystkich plików nie może przekraczać 3MB',
         );
      }

      const uploadUniqueErrors = uploadErrors.reduce((uniqueErrors, error) => {
         if (!uniqueErrors.includes(error)) {
            uniqueErrors.push(error);
         }

         return uniqueErrors;
      }, [] as string[]);

      resetUploadFiles();

      if (uploadUniqueErrors.length > 0) {
         formRef.setFields([
            {
               name: 'files',
               errors: uploadUniqueErrors,
            },
         ]);
      }
   };

   return {
      validateUploadFiles,
      resetUploadFiles,
   };
};
