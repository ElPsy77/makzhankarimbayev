import { JobApplicationData } from '@/types';
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
   jobApplicationData: JobApplicationData,
): Promise<void | Error> => {
   transporter.verify(function (error) {
      if (error) {
         return error;
      }
   });

   await transporter.sendMail({
      from: 'testpoczty@sebastiangolab.pl',
      to: jobApplicationData.email,
      cc: 'golomp1997@gmail.com',
      subject: 'Confirmation of sending a job application',
      html: `
         <b>The application has been delivered, we will respond as soon as possible</b>
         <br/><br/>

         Imię i nazwisko: <b>${jobApplicationData.name}</b><br/>

         Town: <b>${jobApplicationData.town}</b><br/>

         E-mail: <b>${jobApplicationData.email}</b><br/>

         Phone number: <b>+48 ${jobApplicationData.phone}</b><br/>

         Earliest Possible Start Date: <b>${new Date(jobApplicationData.startJobDate).toLocaleDateString()}</b><br/>

         Financial Expectations (netto): <b>${jobApplicationData.financialExpectations} zł</b><br/>

         Last Company Name: <b>${jobApplicationData.lastCompany || '-'}</b><br/>

         Employee name: <b>${jobApplicationData.employeeName || '-'}</b><br/>
         
         Załączniki: <b>${jobApplicationData.uploadNames || '-'}</b>
      `,
   });
};
