import { ReactElement } from 'react';
import { Button, Tooltip } from 'antd';
import { getUploadFilesAction } from '../../services/api/getUploadFilesAction';
import { downloadFile } from '../../helpers/downloadFile';

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
      const response = await getUploadFilesAction(fileName);

      if (!response.ok) {
         alert('An error occurred while downloading the file');

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
