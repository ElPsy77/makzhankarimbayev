import { InboxOutlined } from '@ant-design/icons';

const UploadContent = () => (
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
   </>
);

export default UploadContent;
