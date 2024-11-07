import { InboxOutlined } from '@ant-design/icons/lib/icons';
import { FormInstance } from 'antd/lib/form';
import Upload from 'antd/lib/upload';
import React, { ReactElement } from 'react';
import { useUpload } from '../../hooks/useUpload';

type UploadElementProps = {
   formRef: FormInstance;
};

const UploadElement = ({
   formRef,
}: UploadElementProps): ReactElement<UploadElementProps> => {
   const { validateUploadFiles, resetUploadFiles } = useUpload(formRef);

   const uploadActionApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-mock`;

   return (
      <Upload.Dragger
         action={uploadActionApiUrl}
         multiple
         beforeUpload={validateUploadFiles}
         onRemove={resetUploadFiles}
      >
         <p className='ant-upload-drag-icon'>
            <InboxOutlined />
         </p>

         <p className='ant-upload-text'>
            Kliknij lub przeciągnij plik aby przesłać
         </p>

         <p className='ant-upload-hint'>
            Maksymalny rozmiar pliku 1 MB
            <br />
            Dopuszczalne rozszerzenia: .pdf, .jpg, .png, .zip
         </p>
      </Upload.Dragger>
   );
};

export default UploadElement;
