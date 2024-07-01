import React from 'react';
import { Report } from '@/services/reports/getAllReports';
import { GetResponseData, ResponseError } from './api/reports';

type HomeProps = {
   reports: Report[];
};

export default function Home({ reports }: HomeProps) {
   console.log(reports);

   return <h1>{'Hello Sebastian'}</h1>;
}

export const getServerSideProps = async () => {
   const response = await fetch(`${process.env.BASE_URL}/api/reports`);
   const responseData: GetResponseData | ResponseError = await response.json();
   let reports: Report[] = [];

   if (response.ok) {
      reports = (responseData as GetResponseData).reports;
   }

   return {
      props: {
         reports,
      },
   };
};
