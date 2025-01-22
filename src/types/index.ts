export type JobApplicationData = {
   name: string;
   town: string;
   email: string;
   phone: string;
   startJobDate: string;
   financialExpectations: number;
   lastCompany?: string | null;
   employeeName?: string | null;
   uploadNames: string | null;
   status: number;
   createdDate: string;
   closedDate?: string | null;
};

export type JobApplicationDataWithId = JobApplicationData & {
   id: string;
};
