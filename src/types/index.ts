export type DepositReportData = {
   companyName: string;
   email: string;
   phone: string;
   offerDeadline: string;
   depositPrice: number;
   contractValue: number;
   consortiumStatus?: string | null;
   warrantyPeriod: string;
   caseSign?: string | null;
   uploadNames: string | null;
   status: number;
   createdDate: string;
   closedDate?: string | null;
};

export type DepositReportDataWithId = DepositReportData & {
   id: string;
};
