import { ReactElement } from 'react';
import { Button, Tooltip } from 'antd';

const FilesDownloadButtons = (): ReactElement => {
   const handleOnClick = () => {
      // URL шаблона
      const templateUrl = '/resume-template.pdf';

      // Создаем ссылку для скачивания
      const a = document.createElement('a');
      a.href = templateUrl;
      a.download = 'resume-template.pdf'; // Имя файла при скачивании
      document.body.appendChild(a);
      a.click();
      a.remove();
   };

   return (
      <Tooltip title='Скачать шаблон резюме'>
         <Button onClick={handleOnClick} className='mb-3 block'>
            Скачать резюме
         </Button>
      </Tooltip>
   );
};

export default FilesDownloadButtons;
