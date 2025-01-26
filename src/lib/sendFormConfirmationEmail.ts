import nodemailer from 'nodemailer';
import { JobApplicationData } from '@/types';

const transporter = nodemailer.createTransport({
   host: process.env.CONFIRMATION_MAIL_HOST,
   port: parseInt(process.env.CONFIRMATION_MAIL_PORT ?? ''),
   secure: true,
   auth: {
      user: process.env.CONFIRMATION_MAIL_USER,
      pass: process.env.CONFIRMATION_MAIL_PASS,
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
      from: process.env.CONFIRMATION_MAIL_USER,
      to: jobApplicationData.email,
      cc: process.env.CONFIRMATION_MAIL_CC,
      subject: 'Confirmation of sending a job application',
      html: `
         <b>The application has been delivered, we will respond as soon as possible</b>
         <br/><br/>

         Name: <b>${jobApplicationData.name}</b><br/>

         Town: <b>${jobApplicationData.town}</b><br/>

         E-mail: <b>${jobApplicationData.email}</b><br/>

         Phone number: <b>+48 ${jobApplicationData.phone}</b><br/>

         Earliest Possible Start Date: <b>${new Date(jobApplicationData.startJobDate).toLocaleDateString()}</b><br/>

         Financial Expectations (netto): <b>${jobApplicationData.financialExpectations} zł</b><br/>

         Last Company Name: <b>${jobApplicationData.lastCompany || '-'}</b><br/>

         Recommending employee name: <b>${jobApplicationData.employeeName || '-'}</b><br/>
         
         Files: <b>${jobApplicationData.uploadNames || '-'}</b>
      `,
   });
};
