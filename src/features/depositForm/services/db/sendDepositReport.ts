import { v4 as uuidv4 } from 'uuid';
import { DepositReportData } from '@/types';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const SQL_QUERY = `
   INSERT INTO reports
   (id, companyName, email, phone, offerDeadline, depositPrice, contractValue, consortiumStatus, warrantyPeriod, caseSign, uploadNames, status, createdDate, closedDate)
   VALUES
   (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const sendDepositReport = async (
   depositReport: DepositReportData,
): Promise<boolean> => {
   const [result] = await pool.query<ResultSetHeader>(SQL_QUERY, [
      uuidv4(),
      depositReport.companyName,
      depositReport.email,
      depositReport.phone,
      depositReport.offerDeadline,
      depositReport.depositPrice,
      depositReport.contractValue,
      depositReport.consortiumStatus,
      depositReport.warrantyPeriod,
      depositReport.caseSign,
      depositReport.uploadNames,
      depositReport.status,
      depositReport.createdDate,
      depositReport.closedDate,
   ]);

   return result.affectedRows === 1;
};
