export const phoneValidationRule = {
   pattern: /^(?:\d{3}[\s-]?){2}\d{3}$/,
   message: 'Nieprawidłowy numer telefonu',
};

export const priceValidationRule = {
   pattern: /^\s*\d{1,3}(\s\d{3})*(\s*[,.]\s*\d{1,2})?\s*$/,
   message: 'Nieprawidłowa cena',
};
