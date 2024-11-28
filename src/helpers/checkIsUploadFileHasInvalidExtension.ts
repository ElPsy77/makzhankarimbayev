import { RcFile } from 'antd/lib/upload';

export const acceptedFilesExtensions = [
   'application/pdf',
   'image/jpeg',
   'image/png',
   'application/zip',
];

export const checkIsUploadFileHasInvalidExtension = (file: RcFile): boolean => {
   const hasAcceptedFileExtension = acceptedFilesExtensions.find(
      (extension) => extension === file.type,
   );

   return !hasAcceptedFileExtension ? true : false;
};
