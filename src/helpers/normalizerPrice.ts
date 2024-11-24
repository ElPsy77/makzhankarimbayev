export const normalizerPrice = (value: string): string => {
   let numberStr = value.replace(/[^\d,.]/g, '');
   numberStr = numberStr.replace('.', ',');

   let parts = numberStr.split(',');

   let formatedWholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

   let decimalPart = parts.length > 1 ? ',' + parts[1] : '';
   decimalPart = decimalPart.length > 2 ? decimalPart.slice(0, 3) : decimalPart;

   return formatedWholePart + decimalPart;
};
