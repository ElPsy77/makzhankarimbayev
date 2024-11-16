import FormSubmitButton from '@/components/FormSubmitButton';
import InputElement from '@/components/InputElement';
import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import { ReactElement } from 'react';
import {
   phoneValidationRule,
   priceValidationRule,
} from '../../configs/formRules';
import {
   DepositReportFormData,
   useDepositForm,
} from '../../hooks/useDepositForm';
import { useUpload } from '../../hooks/useUpload';
import DatePickerElement from '../DatePickerElement';
import ResultStatusMessage from '../ResultStatusMessage';

const DepositForm = (): ReactElement => {
   const [formRef] = Form.useForm();

   const {
      formResultStatus,
      validationErrors,
      isButtonLoading,
      sendFormData,
      setFormError,
      resetFormStatus,
   } = useDepositForm(formRef);

   const { validateUploadFiles, resetUploadFiles } = useUpload(formRef);

   const uploadActionApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-mock`;

   return (
      <>
         <Form
            form={formRef}
            name='wadium'
            validateMessages={validateMessages}
            onFinish={sendFormData}
            onFinishFailed={setFormError}
            onChange={resetFormStatus}
            {...formCommonProps}
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
               rules={[{ required: true }, phoneValidationRule]}
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
               rules={[{ required: true }, priceValidationRule]}
               {...formItemCommonProps}
            >
               <InputElement addonAfter='zł' />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Szacunkowa wartość kontraktu'
               name='contractValue'
               rules={[{ required: true }, priceValidationRule]}
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
                  action={uploadActionApiUrl}
                  multiple
                  beforeUpload={validateUploadFiles}
                  onRemove={resetUploadFiles}
               >
                  <p className='ant-upload-drag-icon'>
                     <InboxOutlined />
                  </p>

                  <p className='ant-upload-text'>
                     Kliknij lub przeciągnij plik aby przesłać
                  </p>

                  <p className='ant-upload-hint'>
                     Maksymalny rozmiar pliku 1 MB
                     <br />
                     Dopuszczalne rozszerzenia: .pdf, .jpg, .png, .zip
                  </p>
               </Upload.Dragger>
            </Form.Item>

            <Form.Item>
               <FormSubmitButton
                  text='Wyślij formularz'
                  isLoading={isButtonLoading}
               />
            </Form.Item>
         </Form>

         {formResultStatus ? (
            <ResultStatusMessage
               status={formResultStatus}
               validationErrors={validationErrors}
            />
         ) : null}
      </>
   );
};

export default DepositForm;
