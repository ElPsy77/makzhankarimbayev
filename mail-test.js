require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.CONFIRMATION_MAIL_HOST,
  port: Number(process.env.CONFIRMATION_MAIL_PORT),
  secure: false, // true for 465, false for 587
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

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('❌ Ошибка при отправке:', error);
  }
  console.log('✅ Письмо успешно отправлено:', info.response);
});
