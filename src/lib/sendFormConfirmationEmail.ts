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

   const emailBody = `
      Имя: <b>${jobApplicationData.name}</b><br/>
      Город: <b>${jobApplicationData.town}</b><br/>
      Электронная почта: <b>${jobApplicationData.email}</b><br/>
      Номер телефона: <b>${jobApplicationData.phone}</b><br/>
      Дата начала работы: <b>${new Date(jobApplicationData.startJobDate).toLocaleDateString()}</b><br/>
      Финансовые ожидания: <b>${jobApplicationData.financialExpectations} ₸</b><br/>
      Название последней компании: <b>${jobApplicationData.lastCompany || '-'}</b><br/>
      Имя рекомендующего сотрудника: <b>${jobApplicationData.employeeName || '-'}</b><br/>
      Файлы: <b>${jobApplicationData.uploadNames || '-'}</b>
   `;

   await transporter.sendMail({
      from: process.env.CONFIRMATION_MAIL_USER,
      to: jobApplicationData.email,
      cc: process.env.CONFIRMATION_MAIL_CC,
      subject: 'Подтверждение отправки заявки на работу',
      html: emailBody,
   });
};
