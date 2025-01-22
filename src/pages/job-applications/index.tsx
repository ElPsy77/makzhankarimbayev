import { ReactElement } from 'react';
import TableApplications from '@/features/jobApplications/components/TableApplications';
import ContentContainer from '@/components/ContentContainer';
import { useQuery } from 'react-query';
import { getAllJobApplications } from '@/services/apiQueries/getAllJobApplications';
import { Spin } from 'antd';
import { useAuthSession } from '@/hooks/useAuthSession';
import Head from 'next/head';

const JobApplicationsPage = (): ReactElement => {
   const {
      isLoading: isAuthLoaing,
      isUnAuth,
      redirectToUrl,
   } = useAuthSession('/login-panel');

   const {
      data: jobApplications,
      isLoading: isQueryLoading,
      isError,
   } = useQuery({
      queryFn: getAllJobApplications,
      queryKey: ['jobApplications'],
      refetchOnWindowFocus: false,
   });

   if (isUnAuth) {
      redirectToUrl();
      return <Spin />;
   }

   if (isAuthLoaing) {
      return <Spin />;
   }

   if (isError) {
      return <h2>There was a problem downloading applications...</h2>;
   }

   return (
      <>
         <Head>
            <title>Job Applications</title>
            <meta name='description' content='Applications' />
            <meta name='robots' content='noindex,nofollow' />
         </Head>

         <ContentContainer isFull>
            <h1 className='mb-5 text-3xl font-bold'>Job Applications</h1>

            {isQueryLoading ? (
               <div className='flex'>
                  <Spin className='mr-3' />
                  Loading data...
               </div>
            ) : (
               <TableApplications jobApplications={jobApplications || []} />
            )}
         </ContentContainer>
      </>
   );
};

export default JobApplicationsPage;
