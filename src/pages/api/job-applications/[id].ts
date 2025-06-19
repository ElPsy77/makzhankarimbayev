import { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader } from 'mysql2';
import nodemailer from 'nodemailer';
import db from '@/lib/db';

// Функция для преобразования даты в формат MySQL
const formatDateForMySQL = (date: string): string => {
   const jsDate = new Date(date);
   return jsDate.toISOString().slice(0, 19).replace('T', ' ');
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   const { id } = req.query;

   if (!id || Array.isArray(id)) {
      return res
         .status(400)
         .json({ error: 'Некорректный идентификатор заявки' });
   }

   switch (req.method) {
      case 'DELETE': {
         try {
            // Удаление записи из базы данных
            const result = await db.query(
               `DELETE FROM ${process.env.DB_TABLE_NAME_APPLICATIONS} WHERE id = ?`,
               [id],
            );

            const [resultSetHeader] = result as ResultSetHeader[];
            if (resultSetHeader.affectedRows === 0) {
               return res.status(404).json({ error: 'Анкета не найдена' });
            }

            return res.status(200).json({ message: 'Анкета успешно удалена' });
         } catch (error) {
            console.error('Ошибка при удалении анкеты:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
         }
      }

      case 'PATCH': {
         try {
            const { status, closedDate } = req.body;

            // Преобразование даты
            const formattedDate = closedDate
               ? formatDateForMySQL(closedDate)
               : null;

            // Обновление записи в базе данных
            const result = await db.query(
               `UPDATE ${process.env.DB_TABLE_NAME_APPLICATIONS} SET status = ?, closedDate = ? WHERE id = ?`,
               [status, formattedDate, id],
            );

            const [resultSetHeader] = result as ResultSetHeader[];
            if (resultSetHeader.affectedRows === 0) {
               return res.status(404).json({ error: 'Анкета не найдена' });
            }

            // === ДОБАВЬТЕ ЭТОТ КОД ДЛЯ ОТПРАВКИ ПИСЬМА ===
            if (status === 1) {
               // Получаем email и имя кандидата
               const [rows] = await db.query(
                  `SELECT email, name FROM ${process.env.DB_TABLE_NAME_APPLICATIONS} WHERE id = ?`,
                  [id],
               );
               // rows может быть RowDataPacket[] — явно приводим тип:
               const user = Array.isArray(rows)
                  ? (rows[0] as { email: string; name: string })
                  : null;
               if (user?.email && user?.name) {
                  const transporter = nodemailer.createTransport({
                     host: process.env.CONFIRMATION_MAIL_HOST,
                     port: Number(process.env.CONFIRMATION_MAIL_PORT),
                     secure: false,
                     auth: {
                        user: process.env.CONFIRMATION_MAIL_USER,
                        pass: process.env.CONFIRMATION_MAIL_PASS,
                     },
                  });

                  await transporter.sendMail({
                     from: `"ЯРабота" <${process.env.CONFIRMATION_MAIL_USER}>`,
                     to: user.email,
                     subject: 'Ваша заявка принята!',
                     text: `Здравствуйте, ${user.name}!\n\nПоздравляем, вы приняты на работу! Мы свяжемся с вами для дальнейших инструкций.\n\nС уважением,\nКоманда ЯРабота`,
                  });
               }
            }
            // === КОНЕЦ ДОБАВЛЕННОГО КОДА ===

            return res.status(200).json({ message: 'Статус успешно обновлён' });
         } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
         }
      }

      default:
         res.setHeader('Allow', ['PATCH', 'DELETE']);
         return res
            .status(405)
            .json({ error: `Метод ${req.method} не поддерживается` });
   }
}
