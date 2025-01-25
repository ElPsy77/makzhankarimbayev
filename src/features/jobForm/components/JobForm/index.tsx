import { ReactElement } from 'react';
import { Checkbox, Form, Radio, Upload } from 'antd';
import FormLabelWithTooltip from '@/components/FormLabelWithTooltip';
import FormSubmitButton from '@/components/FormSubmitButton';
import InputElement from '@/components/InputElement';
import InputPhoneNumber from '@/components/InputPhoneNumber';
import InputPriceElement from '@/components/InputPriceElement';
import UploadContent from '@/components/UploadContent';
import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import { phoneValidationRule, priceValidationRule } from '@/configs/formRules';
import { acceptedFilesExtensions } from '@/helpers/checkIsUploadFileHasInvalidExtension';
import DatePickerElement from '../../../../components/DatePickerElement';
import { useUpload } from '../../../../hooks/useUpload';
import { useJobForm } from '../../hooks/useJobForm';
import { JobApplicationFormData } from '../../types';
import ResultStatusMessage from '../ResultStatusMessage';

const JobForm = (): ReactElement => {
   const [formRef] = Form.useForm();

   const isRecommendationFieldValue = Form.useWatch(
      'isRecommendation',
      formRef,
   );

   const {
      formResultStatus,
      validationErrors,
      isButtonLoading,
      sendFormData,
      setFormError,
      resetFormStatus,
   } = useJobForm(formRef);

   const { validateUploadFiles } = useUpload(formRef);

   return (
      <>
         <Form
            form={formRef}
            name='job-form'
            validateMessages={validateMessages}
            onFinish={sendFormData}
            onFinishFailed={setFormError}
            onChange={resetFormStatus}
            {...formCommonProps}
         >
            <Form.Item<JobApplicationFormData>
               label='*Name'
               name='name'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Town'
               name='town'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*E-mail'
               name='email'
               rules={[{ required: true }, { type: 'email' }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Phone Number'
               name='phone'
               rules={[{ required: true }, phoneValidationRule]}
               {...formItemCommonProps}
            >
               <InputPhoneNumber />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Earliest Possible Start Date'
               name='startJobDate'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Financial Expectations (netto)'
               name='financialExpectations'
               rules={[{ required: true }, priceValidationRule]}
               {...formItemCommonProps}
            >
               <InputPriceElement
                  name='financialExpectations'
                  formRef={formRef}
               />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='Last Company Name'
               name='lastCompany'
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item
               label={
                  <FormLabelWithTooltip
                     text='*Recommendation of our employee'
                     tooltip='Przykładowy tekst'
                  />
               }
               name='isRecommendation'
               rules={[
                  {
                     required: true,
                     message:
                        '*Recommendation of our employee is required field',
                  },
               ]}
            >
               <Radio.Group>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={0}>No</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Employee name'
               name='employeeName'
               hidden={isRecommendationFieldValue !== 1}
               rules={[{ required: isRecommendationFieldValue === 1 }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='Załączniki'
               name='files'
               {...formItemCommonProps}
            >
               <Upload.Dragger
                  multiple
                  onChange={validateUploadFiles}
                  accept={acceptedFilesExtensions.join(',')}
               >
                  <UploadContent />
               </Upload.Dragger>
            </Form.Item>

            <Form.Item
               name='agreement'
               valuePropName='checked'
               label={null}
               rules={[
                  {
                     validator: (_, value) =>
                        value
                           ? Promise.resolve()
                           : Promise.reject(
                                new Error('*Accept condition is required'),
                             ),
                  },
               ]}
            >
               <Checkbox>*I accept the condition</Checkbox>
            </Form.Item>

            <Form.Item>
               <FormSubmitButton
                  text='Send application'
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

export default JobForm;
