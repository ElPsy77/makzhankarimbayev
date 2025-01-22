import React, { ReactElement } from 'react';
import ContentContainer from '@/components/ContentContainer';
import JobForm from '@/features/jobForm/components/JobForm';
import Head from 'next/head';

const JobApplicationFormPage = (): ReactElement => (
   <>
      <Head>
         <title>Job Application Form</title>
         <meta name='description' content='Job Application Form' />
         <meta name='robots' content='index,follow' />
      </Head>

      <ContentContainer>
         <h1 className='mb-5 text-3xl font-bold'>
            Polish Job Application Form
         </h1>

         <p className='mb-10'>
            If you want use my app for your company, please write to me
            sebagolab97@gmail.com
         </p>

         <JobForm />
      </ContentContainer>
   </>
);

export default JobApplicationFormPage;
