import React, { ReactElement } from 'react';
import { FormProps, Button, Form, Upload } from 'antd';
import { DepositReportFormData } from '@/types/depositReports';
import InputElement from '@/components/InputElement';
import InputNumberElement from '@/components/InputNumberElement';
import DatePickerElement from '@/components/DatePickerElement';
import { InboxOutlined } from '@ant-design/icons';
import { UploadPostResponseData } from '../api/upload';

const onFinishFailed: FormProps<DepositReportFormData>['onFinishFailed'] = (
   errorInfo,
) => {
   console.error(errorInfo);
};

const onFinish: FormProps<DepositReportFormData>['onFinish'] = async (
   formValues,
) => {
   const formData = new FormData();
   let uploadUrls: string = '';

   if (formValues.files && formValues.files.fileList.length > 0) {
      formValues.files.fileList.forEach((file) => {
         if (file.originFileObj) {
            formData.append('files', file.originFileObj);
         }
      });

      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
            {
               method: 'POST',
               body: formData,
            },
         );

         const responseData: UploadPostResponseData = await response.json();

         uploadUrls = responseData.uploadUrls;

         console.log(uploadUrls);
      } catch (err) {
         console.error(err);
      }
   }

   // try {
   //    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports`, {
   //       method: 'POST',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify({
   //          ...formValues,
   //          uploadUrls: uploadUrls,
   //       }),
   //    });
   // } catch (err) {
   //    console.error(err);
   // }
};

const formItemCommonProps = {
   hasFeedback: true,
   validateDebounce: 500,
   className: 'mb-6',
};

const requiredFieldRule = {
   required: false,
   message: 'To pole jest obowiązkowe',
};

export default function DepositFormPage(): ReactElement {
   return (
      <>
         <h1 className='mb-5 text-3xl font-bold'>Formularz Wadium</h1>

         <p className='mb-10'>
            W razie pytań prosimy o kontakt test@aspergo.com
         </p>

         <Form
            name='wadium'
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            requiredMark={false}
            size='large'
            scrollToFirstError={true}
         >
            <Form.Item<DepositReportFormData>
               label='Nazwa firmy'
               name='companyName'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Adres email'
               name='email'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Telefon'
               name='phone'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputNumberElement addonBefore='+48' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Termin składania ofert'
               name='offerDeadline'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Kwota wadium'
               name='depositPrice'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputNumberElement addonAfter='zł' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Szacunkowa wartość kontraktu'
               name='contractValue'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputNumberElement addonAfter='zł' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Status konsorcjum'
               name='consortiumStatus'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Okres gwarancji i rękojmi'
               name='warrantyPeriod'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Znak sprawy / numer postępowania'
               name='caseSign'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Załączniki'
               name='files'
               rules={[requiredFieldRule]}
               {...formItemCommonProps}
            >
               <Upload.Dragger multiple>
                  <p className='ant-upload-drag-icon'>
                     <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>
                     Kliknij lub przeciągnij plik aby przesłać
                  </p>
                  <p className='ant-upload-hint'>
                     Maksymalny rozmiar pliku 1 MB
                  </p>
               </Upload.Dragger>
            </Form.Item>

            <Form.Item>
               <Button
                  type='primary'
                  htmlType='submit'
                  className='bg-green w-full px-10 py-7 hover:bg-brown text-lg'
               >
                  Wyślij formularz
               </Button>
            </Form.Item>
         </Form>
      </>
   );
}
