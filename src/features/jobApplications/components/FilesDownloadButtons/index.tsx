import { ReactElement } from 'react';
import { Button, Tooltip } from 'antd';
import { downloadFile } from '../../helpers/downloadFile';
import { getUploadFilesAction } from '../../services/api/getUploadFilesAction';

type FilesDownloadButtonsProps = {
   uploadNames: string;
};

const FilesDownloadButtons = ({
   uploadNames,
}: FilesDownloadButtonsProps): ReactElement<FilesDownloadButtonsProps> => {
   const filesNames = new String(uploadNames).split(',');

   const filteredFilesNames = filesNames.filter(
      (fileName) => fileName !== 'null',
   );

   const handleOnClick = async (fileName: string) => {
      if (process.env.NEXT_PUBLIC_IS_DEMO_UPLOAD) {
         alert('Demo version not have uploaded files on server');

         return;
      }

      const response = await getUploadFilesAction(fileName);

      if (!response) {
         return;
      }

      const blob = await response.blob();
      downloadFile(blob, fileName);
   };

   const filesButtons = filteredFilesNames.map((fileName) => (
      <Tooltip key={fileName} title='Download file'>
         <Button onClick={() => handleOnClick(fileName)} className='mb-3 block'>
            {fileName}
         </Button>
      </Tooltip>
   ));

   return <>{filesButtons}</>;
};

export default FilesDownloadButtons;
