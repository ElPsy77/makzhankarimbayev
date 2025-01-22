import { ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { JobApplicationData } from '@/types';
import pool from '@/lib/db';

const SQL_QUERY = `
   INSERT INTO applications
   (id, name, appliedPostion, town, email, phone, startJobDate, financialExpectations, lastCompany, employeeName, uploadNames, status, createdDate, closedDate)
   VALUES
   (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const sendJobApplicationDb = async (
   jobApplicationData: JobApplicationData,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      uuidv4(),
      jobApplicationData.name,
      jobApplicationData.appliedPostion,
      jobApplicationData.town,
      jobApplicationData.email,
      jobApplicationData.phone,
      jobApplicationData.startJobDate,
      jobApplicationData.financialExpectations,
      jobApplicationData.lastCompany,
      jobApplicationData.employeeName,
      jobApplicationData.uploadNames,
      jobApplicationData.status,
      jobApplicationData.createdDate,
      jobApplicationData.closedDate,
   ]);

   return result.affectedRows === 1;
};
