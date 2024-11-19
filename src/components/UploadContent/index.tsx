import { InboxOutlined } from '@ant-design/icons';

const UploadContent = () => (
   <>
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
   </>
);

export default UploadContent;
