import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { fileName } = req.query;

   if (!fileName || Array.isArray(fileName)) {
      return res.status(400).json({ error: 'Invalid fileName' });
   }

   const decodedFileName = decodeURIComponent(fileName as string); // Декодируем имя файла
   console.log('Имя файла из запроса:', decodedFileName);

   const filePath = path.resolve('./uploads', decodedFileName);
   console.log('Путь к файлу:', filePath);

   if (!fs.existsSync(filePath)) {
      console.error('Файл не найден:', filePath);
      return res.status(404).json({ error: 'file not found' });
   }

   try {
      const fileContent = fs.readFileSync(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
         'Content-Disposition',
         `attachment; filename="${decodedFileName}"`,
      );
      res.send(fileContent);
   } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return res.status(500).json({ error: 'Error fetching file' });
   }
};
