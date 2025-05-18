import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.CONFIRMATION_MAIL_HOST,
  port: Number(process.env.CONFIRMATION_MAIL_PORT),
  secure: false, // true для порта 465, false для 587
  auth: {
    user: process.env.CONFIRMATION_MAIL_USER,
    pass: process.env.CONFIRMATION_MAIL_PASS,
  },
});

const mailOptions = {
  from: `"Job Platform" <${process.env.CONFIRMATION_MAIL_USER}>`,
  to: process.env.CONFIRMATION_MAIL_CC,
  subject: '🧪 Тестовое письмо от платформы',
  text: 'Если ты читаешь это — значит SMTP работает!',
};

async function sendConfirmationEmail(email) {
  console.log('📧 Отправка письма на email:', email);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('❌ Ошибка при отправке:', error);
    }
    console.log('✅ Письмо успешно отправлено:', info.response);
  });
}

await sendConfirmationEmail(process.env.CONFIRMATION_MAIL_CC);
