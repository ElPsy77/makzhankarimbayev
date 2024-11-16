export const normalizeDetailRowValue = (
   detailKey: string,
   value: string,
): string => {
   if (detailKey === 'createdDate' || detailKey === 'closedDate') {
      return new Date(value).toLocaleString();
   }

   return value;
};
