export const normalizerPhoneNumber = (value: string): string => {
   // Удаляем все символы, кроме цифр
   return value.replace(/\D/g, '');
};

export const isValidPhoneNumber = (phone: string): boolean => {
   console.log('Проверяем номер:', phone);
   // Проверяем, что номер состоит из 10 цифр
   return /^\d{10}$/.test(phone);
};
