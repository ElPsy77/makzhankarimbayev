import { InboxOutlined } from '@ant-design/icons';

const UploadContent = () => {
   return (
      <>
         <p className='ant-upload-drag-icon'>
            <InboxOutlined />
         </p>

         <p className='ant-upload-text'>Клик или перенисте файл</p>
         <p className='ant-upload-hint'>
            Максимальный размер файла 3 MB
            <br />
            Приемлемые расширения: .pdf, .jpg, .png, .zip
         </p>

         {process.env.NEXT_PUBLIC_IS_DEMO_UPLOAD ? (
            <>
               <br />
               <p>ЭТО ВЕРСИЯ, ЗАГРУЖАЕТ ФАЙЛ НА СЕРВЕР</p>
            </>
         ) : null}
      </>
   );
};

export default UploadContent;
