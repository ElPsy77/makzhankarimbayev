import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: 's118.cyber-folks.pl',
   port: 465,
   secure: true,
   auth: {
      user: 'testpoczty@sebastiangolab.pl',
      pass: '-SVQoC.1x2+-Nq*j',
   },
});

export const sendFormConfirmationEmail = async (
   emailTo: string,
): Promise<void | Error> => {
   transporter.verify(function (error) {
      if (error) {
         return error;
      }
   });

   await transporter.sendMail({
      from: 'testpoczty@sebastiangolab.pl',
      to: emailTo,
      subject: 'Potwierdzenie wysłania formularza Wadium',
      html: '<b>Formularz został dostarczony, odpowiemy w przeciągu 24h</b>',
   });
};
