import fs from 'fs';
import path from 'path';

export const generateUniqueUploadFilename = (
   dir: string,
   filename: string,
): string => {
   const ext = path.extname(filename);
   const name = path.basename(filename, ext);
   let newFilename = filename;
   let counter = 1;

   while (fs.existsSync(path.join(dir, newFilename))) {
      newFilename = `${name}_${counter}${ext}`;
      counter++;
   }

   return newFilename;
};
