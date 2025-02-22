export const normalizeDetailRowValue = (
   detailKey: string,
   value: string,
): string => {
   if (detailKey === 'createdDate' || detailKey === 'closedDate') {
      return new Date(value).toLocaleString();
   }

   if (detailKey === 'startJobDate') {
      return new Date(value).toLocaleDateString();
   }

   return value;
};
