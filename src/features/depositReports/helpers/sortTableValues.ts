export const sortTableValues = (
   a: string | number,
   b: string | number,
): number => {
   if (a < b) {
      return -1;
   }

   if (a > b) {
      return 1;
   }

   return 0;
};
