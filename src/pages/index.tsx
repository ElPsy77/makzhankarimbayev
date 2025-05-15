import React, { ReactElement } from 'react';
import Head from 'next/head';
import ContentContainer from '@/components/ContentContainer';
import JobForm from '@/features/jobForm/components/JobForm';

const JobApplicationFormPage = (): ReactElement => (
   <>
      <Head>
         <title>Форма заявки на работу</title>
         <meta name='description' content='Job Application Form' />
         <meta name='robots' content='index,follow' />
      </Head>

      <ContentContainer>
         <h1 className='mb-5 text-3xl font-bold'>
            Форма заявки на работу
         </h1>

          <p className='mb-10'>
            Сделенно в качетсве дипломной работы от <strong>Мейрбека Алмаса</strong> для колледжа
            <br />
            <a
               href='https://almatypolytech.edu.kz'
               target='_blank'
               rel='noopener noreferrer'
               className='text-blue-500'
            >
               Almaty Polytechnic College
            </a>
          </p>

         <JobForm />
      </ContentContainer>
   </>
);

export default JobApplicationFormPage;
