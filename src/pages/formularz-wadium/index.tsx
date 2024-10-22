import React, { ReactElement, useState } from 'react';
import { FormProps, Button, Form, Upload, Alert } from 'antd';
import { DepositReportFormData } from '@/types/depositReports';
import InputElement from '@/components/InputElement';
import DatePickerElement from '@/components/DatePickerElement';
import { InboxOutlined } from '@ant-design/icons';
import { UploadPostResponseData } from '../api/uploads';
import ContentContainer from '@/components/ContentContainer';
import { RcFile } from 'antd/lib/upload';

enum FormResultStatus {
   SUCCESSS = 'success',
   ERROR = 'error',
}

const formItemCommonProps = {
   hasFeedback: true,
   validateDebounce: 500,
   className: 'mb-6',
};

const validateMessages = {
   required: '${label} jest polem wymaganym',
   types: {
      email: 'Nieprawidłowy adres email',
   },
};

const phoneRule = {
   pattern: /^(?:\d{3}[\s-]?){2}\d{3}$/,
   message: 'Nieprawidłowy numer telefonu',
};

const priceRegex = {
   pattern: /^\d+([,.]\d{1,2})?$/,
   message: 'Nieprawidłowa cena',
};

const maxSingleFileSize = 3 * 1024 * 1024;
const maxTotalFilesSize = 10 * 1024 * 1024;
const acceptedFilesExtensions = [
   'application/pdf',
   'image/jpeg',
   'image/png',
   'application/zip',
];

export default function DepositFormPage(): ReactElement {
   const [formRef] = Form.useForm();
   const [formResultStatus, setFormResultStatus] =
      useState<FormResultStatus | null>(null);

   const onFinish: FormProps<DepositReportFormData>['onFinish'] = async (
      formValues,
   ) => {
      const formData = new FormData();
      let uploadNames: string | null = null;

      const { files, ...restFormValues } = formValues;

      if (files && files.fileList.length > 0) {
         files.fileList.forEach((file) => {
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

            uploadNames = responseData.uploadNames;
         } catch (err) {
            console.error(err);

            setFormResultStatus(FormResultStatus.ERROR);

            return;
         }
      }

      try {
         fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deposit-reports`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               ...restFormValues,
               uploadNames,
               status: 0,
               createdDate: new Date(),
               closedDate: null,
            }),
         });

         formRef.resetFields();

         setFormResultStatus(FormResultStatus.SUCCESSS);
      } catch (err) {
         console.error(err);

         setFormResultStatus(FormResultStatus.ERROR);
      }
   };

   const onFinishFailed: FormProps<DepositReportFormData>['onFinishFailed'] = (
      errorInfo,
   ) => {
      console.error(errorInfo);

      setFormResultStatus(FormResultStatus.ERROR);
   };

   const handleBeforeUpload = (_: RcFile, fileList: RcFile[]) => {
      const uploadErrors: string[] = [];

      const prevUpload = formRef.getFieldValue('files');

      const prevUploadFiles: RcFile[] = prevUpload ? prevUpload.fileList : [];

      fileList.forEach((file) => {
         const isFileExist = prevUploadFiles.find(
            (prevFile) => prevFile.name === file.name,
         );

         if (isFileExist) {
            uploadErrors.push(`Plik "${file.name}" jest już dodany`);
         }

         if (file.size > maxSingleFileSize) {
            uploadErrors.push(
               `Rozmiar pliku "${file.name}" jest zbyt duży (max. 3MB)`,
            );
         }

         const hasAcceptedFileExtension = acceptedFilesExtensions.find(
            (extension) => extension === file.type,
         );

         if (!hasAcceptedFileExtension) {
            uploadErrors.push(
               `Plik "${file.name}" ma nieprawidłowe rozszerzenie`,
            );
         }
      });

      const prevUploadFilesSize = prevUploadFiles.reduce(
         (totalSize, file) => totalSize + file.size,
         0,
      );

      const totalFilesSize = fileList.reduce(
         (totalSize, file) => totalSize + file.size,
         prevUploadFilesSize,
      );

      if (totalFilesSize > maxTotalFilesSize) {
         uploadErrors.push(
            'Łączny rozmiar wszystkich plików nie może przekraczać 10MB',
         );
      }

      if (uploadErrors.length > 0) {
         formRef.setFields([
            {
               name: 'files',
               errors: uploadErrors,
            },
         ]);

         return Upload.LIST_IGNORE;
      }

      formRef.setFields([
         {
            name: 'files',
            errors: [],
         },
      ]);

      return true;
   };

   const handleUploadFileRemove = () => {
      formRef.setFields([
         {
            name: 'files',
            errors: [],
         },
      ]);
   };

   const getValidatioErrors = (): string[] | null => {
      const errors = formRef.getFieldsError();

      if (errors.length === 0) {
         return null;
      }

      let errorsMessages: string[] = [];

      errors.map((errorObject) => {
         errorObject.errors.forEach((error) => errorsMessages.push(error));
      });

      return errorsMessages;
   };

   const validationErrors =
      formResultStatus === FormResultStatus.ERROR ? getValidatioErrors() : null;

   return (
      <ContentContainer>
         <h1 className='mb-5 text-3xl font-bold'>Formularz Wadium</h1>

         <p className='mb-10'>
            W razie pytań prosimy o kontakt test@aspergo.com
         </p>

         <Form
            name='wadium'
            form={formRef}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            requiredMark={false}
            size='large'
            validateMessages={validateMessages}
            onChange={() => setFormResultStatus(null)}
         >
            <Form.Item<DepositReportFormData>
               label='Nazwa firmy'
               name='companyName'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Adres email'
               name='email'
               rules={[{ required: true }, { type: 'email' }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Telefon'
               name='phone'
               rules={[{ required: true }, phoneRule]}
               {...formItemCommonProps}
            >
               <InputElement addonBefore='+48' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Termin składania ofert'
               name='offerDeadline'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Kwota wadium'
               name='depositPrice'
               rules={[{ required: true }, priceRegex]}
               {...formItemCommonProps}
            >
               <InputElement addonAfter='zł' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Szacunkowa wartość kontraktu'
               name='contractValue'
               rules={[{ required: true }, priceRegex]}
               {...formItemCommonProps}
            >
               <InputElement addonAfter='zł' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Status konsorcjum'
               name='consortiumStatus'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Okres gwarancji i rękojmi'
               name='warrantyPeriod'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Znak sprawy / numer postępowania'
               name='caseSign'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Załączniki'
               name='files'
               {...formItemCommonProps}
            >
               <Upload.Dragger
                  action={`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-mock`}
                  multiple
                  beforeUpload={handleBeforeUpload}
                  onRemove={handleUploadFileRemove}
               >
                  <p className='ant-upload-drag-icon'>
                     <InboxOutlined />
                  </p>

                  <p className='ant-upload-text'>
                     Kliknij lub przeciągnij plik aby przesłać
                  </p>

                  <p className='ant-upload-hint'>
                     Maksymalny rozmiar pliku 3 MB
                     <br />
                     Dopuszczalne rozszerzenia: .pdf, .jpg, .png, .zip
                  </p>
               </Upload.Dragger>
            </Form.Item>

            <Form.Item>
               <Button
                  type='primary'
                  htmlType='submit'
                  className='bg-green w-full px-10 py-7 hover:bg-brown text-lg mt-2'
               >
                  Wyślij formularz
               </Button>
            </Form.Item>
         </Form>

         {formResultStatus === FormResultStatus.SUCCESSS ? (
            <Alert
               className='text-base'
               message='Formularz został wysłany'
               type='success'
               showIcon
            />
         ) : null}

         {formResultStatus === FormResultStatus.ERROR ? (
            <Alert
               message={
                  validationErrors === null ? (
                     'Wystąpił problem podczas wysyłania wiadomości, skontaktuj się z administratorem'
                  ) : (
                     <>
                        {validationErrors.map((error) => (
                           <p key={error} className='mb-1'>
                              {error}
                           </p>
                        ))}
                     </>
                  )
               }
               type='error'
               showIcon={validationErrors === null}
            />
         ) : null}
      </ContentContainer>
   );
}
