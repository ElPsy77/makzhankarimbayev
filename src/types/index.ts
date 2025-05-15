export interface JobApplicationData {
   name: string;
   town: string;
   email: string;
   phone: string;
   startJobDate: string | Date;
   financialExpectations: string;
   lastCompany?: string;
   isRecommendation: boolean; // ✅ добавлено
   employeeName: string;
   agreement: boolean; // ✅ добавлено
   uploadNames?: string;
   status?: number;
   createdDate: string | Date;
   closedDate?: string | Date | null;
}

export type JobApplicationDataWithId = JobApplicationData & {
   id: string;
};
