import { InboxOutlined } from '@ant-design/icons';

const UploadContent = () => {
   return (
      <>
         <p className='ant-upload-drag-icon'>
            <InboxOutlined />
         </p>

         <p className='ant-upload-text'>Click or drag the file to upload</p>
         <p className='ant-upload-hint'>
            Maximum file size 3 MB
            <br />
            Acceptable extensions: .pdf, .jpg, .png, .zip
         </p>

         {process.env.NEXT_PUBLIC_IS_DEMO_UPLOAD ? (
            <>
               <br />
               <p>
                  THIS IS A DEMO VERSION, SO FILES WILL NOT BE UPLOADED TO THE
                  SERVER
               </p>
            </>
         ) : null}
      </>
   );
};

export default UploadContent;
