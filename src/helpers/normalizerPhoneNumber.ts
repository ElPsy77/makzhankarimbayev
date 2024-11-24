export const normalizerPhoneNumber = (value: string): string => {
   const cleanedInput = value.replace(/[^\d]/g, '').trim();

   let formatted = [];

   const digits = cleanedInput.split('');
   for (let i = 0; i < digits.length; i++) {
      formatted.push(digits[i]);

      if ((i + 1) % 3 === 0 && i + 1 !== digits.length) {
         formatted.push(' ');
      }
   }

   if (value.length > 11) {
      formatted = formatted.slice(0, 11);
   }

   return formatted.join('');
};
