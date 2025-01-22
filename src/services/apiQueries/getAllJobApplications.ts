import { JobApplicationDataWithId } from '@/types';

export const getAllJobApplications = async () => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/job-applications`,
   );

   const responseData = await response.json();
   let jobApplications: JobApplicationDataWithId[] = [];

   if (response.ok) {
      jobApplications = responseData.jobApplications;

      return jobApplications;
   }

   throw Error('There was a problem downloading applications');
};
