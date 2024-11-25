import { DepositReportData } from '@/types/depositReports';
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
   depositReportData: DepositReportData,
): Promise<void | Error> => {
   transporter.verify(function (error) {
      if (error) {
         return error;
      }
   });

   await transporter.sendMail({
      from: 'testpoczty@sebastiangolab.pl',
      to: depositReportData.email,
      cc: 'golomp1997@gmail.com',
      subject: 'Potwierdzenie wysłania formularza Wadium - Aspergo',
      html: `
         <b>Formularz został dostarzony, odpowiemy w przeciągu 24h</b>
         <br/><br/>

         Nazwa firmy: <b>${depositReportData.companyName}</b><br/>

         Adres email: <b>${depositReportData.email}</b><br/>

         Telefon: <b>+48 ${depositReportData.phone}</b><br/>

         Termin składania ofert: <b>${new Date(depositReportData.offerDeadline).toLocaleDateString()}</b><br/>

         Kwota wadium: <b>${depositReportData.depositPrice} zł</b><br/>

         Szacunkowa wartość kontraktu: <b>${depositReportData.contractValue}</b><br/>

         Status konsorcjum: <b>${depositReportData.consortiumStatus || '-'}</b><br/>

         Okres gwarancji i rękojmi: <b>${depositReportData.warrantyPeriod}</b><br/>

         Znak sprawy / link: <b>${depositReportData.caseSign || '-'}</b><br/>
         
         Załączniki: <b>${depositReportData.uploadNames || '-'}</b>
      `,
   });
};
