import { ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db';
import { JobApplicationData } from '@/types';

// Функция форматирования даты в YYYY-MM-DD
const formatDate = (date: string | Date): string => {
   return new Date(date).toISOString().split('T')[0]; // '2025-05-25T19:00:00.000Z' => '2025-05-25'
};

const formatDateForMySQL = (date: string): string => {
   const jsDate = new Date(date);
   return jsDate.toISOString().slice(0, 19).replace('T', ' ');
};

const SQL_QUERY = `
   INSERT INTO ${process.env.DB_TABLE_NAME_APPLICATIONS}
   (id, name, town, email, phone, startJobDate, financialExpectations, lastCompany, isRecommendation, employeeName, agreement, uploadNames, status, createdDate, closedDate)
   VALUES
   (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const sendJobApplicationDb = async (
   jobApplicationData: JobApplicationData,
): Promise<boolean> => {
   console.log('Saving job application data:', jobApplicationData);

   const safeEmployeeName = jobApplicationData.isRecommendation
      ? jobApplicationData.employeeName
      : '';

   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      uuidv4(),
      jobApplicationData.name,
      jobApplicationData.town,
      jobApplicationData.email,
      jobApplicationData.phone,
      formatDate(jobApplicationData.startJobDate),
      jobApplicationData.financialExpectations,
      jobApplicationData.lastCompany ?? null,
      jobApplicationData.isRecommendation ? 1 : 0,
      safeEmployeeName, // <-- всегда строка, не null!
      jobApplicationData.agreement ? 1 : 0,
      jobApplicationData.uploadNames ?? null,
      0,
      new Date().toISOString().slice(0, 19).replace('T', ' '),
      null,
   ]);

   return result.affectedRows === 1;
};

export const updateJobApplicationStatus = async (
   id: string,
   status: number,
   closedDate: string,
) => {
   const formattedDate = closedDate ? formatDateForMySQL(closedDate) : null;

   const query = `
      UPDATE ${process.env.DB_TABLE_NAME_APPLICATIONS}
      SET status = ?, closedDate = ?
      WHERE id = ?
  `;

   const result = await pool.query(query, [status, formattedDate, id]);
   return result;
};
