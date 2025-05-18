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
               label='*Имя'
               name='name'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Город'
               name='town'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Электронная почта'
               name='email'
               rules={[{ required: true }, { type: 'email' }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Номер телефона'
               name='phone'
               rules={[
                  {
                     required: true,
                     message: 'Пожалуйста, введите номер телефона',
                  },
                  {
                     pattern: /^\d{10}$/,
                     message: 'Номер телефона должен содержать 10 цифр',
                  },
               ]}
               {...formItemCommonProps}
            >
               <InputPhoneNumber />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Дата начала работы'
               name='startJobDate'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Финансовые ожидания (на руки)'
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
               label='Название последней компании'
               name='lastCompany'
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item
               label={
                  <FormLabelWithTooltip
                     text='*Рекомендация нашего сотрудника'
                     tooltip='Например: Иван Иванов порекомендовал'
                  />
               }
               name='isRecommendation'
               rules={[
                  {
                     required: true,
                     message: '*Рекомендация обязательна для заполнения',
                  },
               ]}
            >
               <Radio.Group>
                  <Radio value={1}>Да</Radio>
                  <Radio value={0}>Нет</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='*Имя сотрудника'
               name='employeeName'
               hidden={isRecommendationFieldValue !== 1}
               rules={[{ required: isRecommendationFieldValue === 1 }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<JobApplicationFormData>
               label='Вложения'
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
                                new Error('*Вы должны принять условия'),
                             ),
                  },
               ]}
            >
               <Checkbox>*Я принимаю условия</Checkbox>
            </Form.Item>

            <Form.Item>
               <FormSubmitButton
                  text='Отправить анкету'
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
