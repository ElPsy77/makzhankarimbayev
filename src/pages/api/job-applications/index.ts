import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { sendJobApplicationDb } from '@/features/jobForm/services/db/sendJobApplicationDb';
import { getAllJobApplicationsDb } from '@/services/db/getAllJobApplicationsDb';
import { JobApplicationData } from '@/types';

const sendConfirmationEmail = async (
   email: string,
   jobApplicationData: JobApplicationData,
) => {
   const transporter = nodemailer.createTransport({
      host: process.env.CONFIRMATION_MAIL_HOST,
      port: Number(process.env.CONFIRMATION_MAIL_PORT),
      secure: false,
      auth: {
         user: process.env.CONFIRMATION_MAIL_USER,
         pass: process.env.CONFIRMATION_MAIL_PASS,
      },
   });

   // Формируем текст письма с данными заявки
   const applicationDetails = `
    Здравствуйте!

    Спасибо за вашу заявку. Она успешно получена и обрабатывается. Вот данные, которые вы указали:

    - Имя: ${jobApplicationData.name}
    - Город: ${jobApplicationData.town}
    - Email: ${jobApplicationData.email}
    - Телефон: ${jobApplicationData.phone}
    - Дата начала работы: ${jobApplicationData.startJobDate}
    - Ожидания по зарплате: ${jobApplicationData.financialExpectations}
    - Последняя компания: ${jobApplicationData.lastCompany}
    - Рекомендация: ${jobApplicationData.isRecommendation ? 'Да' : 'Нет'}
    - Сотрудник: ${jobApplicationData.employeeName}
    - Согласие: ${jobApplicationData.agreement ? 'Да' : 'Нет'}

    Мы свяжемся с вами в ближайшее время.

    С уважением,  
    Команда ЯРабота
  `;

   const mailOptions = {
      from: `"ЯРабота" <${process.env.CONFIRMATION_MAIL_USER}>`,
      to: email,
      subject: 'Ваша заявка обрабатывается',
      text: applicationDetails,
   };

   console.log('Email для уведомления:', email);

   await transporter.sendMail(mailOptions);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
   switch (req.method) {
      case 'POST': {
         try {
            const jobApplicationData: JobApplicationData = req.body;
            console.log('📦 Пришли данные:', jobApplicationData); // Лог данных

            const result = await sendJobApplicationDb(jobApplicationData);

            if (!result) {
               console.error('❌ Ошибка: Не удалось сохранить данные в БД');
               return res
                  .status(500)
                  .json({ error: 'Failed to save job application' });
            }

            console.log('✅ Данные успешно сохранены в БД');

            console.log(
               'Пробую отправить письмо на:',
               jobApplicationData.email,
            );
            await sendConfirmationEmail(
               jobApplicationData.email,
               jobApplicationData,
            );

            return res.status(200).json({ success: true });
         } catch (err) {
            console.error('❌ Ошибка внутри POST:', err);
            return res.status(500).json({ error: 'Internal server error' });
         }
      }

      case 'GET': {
         try {
            const jobApplications = await getAllJobApplicationsDb();

            return res.status(200).json({ jobApplications });
         } catch (err) {
            console.error('❌ Ошибка при получении заявок:', err);
            return res
               .status(500)
               .json({ error: 'Failed to fetch job applications' });
         }
      }

      default:
         return res.status(405).json({ error: 'Method Not Allowed' });
   }
};
