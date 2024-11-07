import { WithId } from 'mongodb';

export type DepositReportData = {
   companyName: string;
   email: string;
   phone: string;
   offerDeadline: string;
   depositPrice: number;
   contractValue: number;
   consortiumStatus: string;
   warrantyPeriod: string;
   caseSign: string;
   uploadNames: string | null;
   status: number;
   createdDate: string;
   closedDate: string | null;
};

export type DepositReportModel = WithId<DepositReportData>;
