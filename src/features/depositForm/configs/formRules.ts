export const phoneValidationRule = {
   pattern: /^(?:\d{3}[\s-]?){2}\d{3}$/,
   message: 'Nieprawidłowy numer telefonu',
};

export const priceValidationRule = {
   pattern: /^\d+([,.]\d{1,2})?$/,
   message: 'Nieprawidłowa cena',
};
