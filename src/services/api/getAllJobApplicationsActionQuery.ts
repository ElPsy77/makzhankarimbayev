import { JobApplicationDataWithId } from '@/types';

export const getAllJobApplicationsActionQuery = async () => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications`,
   );

   const responseData = await response.json();
   let jobApplications: JobApplicationDataWithId[] = [];

   if (response.ok) {
      jobApplications = responseData.jobApplications;

      return jobApplications;
   }

   throw Error('Произошла ошибка при загрузке заявок');
};
