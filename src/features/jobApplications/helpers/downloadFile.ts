export const downloadFile = (blogFile: Blob, fileName: string): void => {
   const url = window.URL.createObjectURL(blogFile);
   const a = document.createElement('a');

   a.style.display = 'none';
   a.href = url;
   a.download = fileName;
   document.body.appendChild(a);

   a.click();
   window.URL.revokeObjectURL(url);
};
