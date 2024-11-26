import FormSubmitButton from '@/components/FormSubmitButton';
import InputElement from '@/components/InputElement';
import {
   formCommonProps,
   formItemCommonProps,
   validateMessages,
} from '@/configs/form';
import { Checkbox, Form, Radio, Upload } from 'antd';
import { ReactElement } from 'react';
import { useDepositForm } from '../../hooks/useDepositForm';
import { useUpload } from '../../../../hooks/useUpload';
import DatePickerElement from '../../../../components/DatePickerElement';
import ResultStatusMessage from '../ResultStatusMessage';
import { phoneValidationRule, priceValidationRule } from '@/configs/formRules';
import UploadContent from '@/components/UploadContent';
import { DepositReportFormData } from '../../types';
import FormLabelWithTooltip from '@/components/FormLabelWithTooltip';
import InputPriceElement from '@/components/InputPriceElement';
import InputPhoneNumber from '@/components/InputPhoneNumber';
import Link from 'next/link';

const DepositForm = (): ReactElement => {
   const [formRef] = Form.useForm();

   const consortiumFieldValue = Form.useWatch('consortium', formRef);

   const {
      formResultStatus,
      validationErrors,
      isButtonLoading,
      sendFormData,
      setFormError,
      resetFormStatus,
   } = useDepositForm(formRef);

   const { validateUploadFiles } = useUpload(formRef);

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
               label={
                  <FormLabelWithTooltip
                     text='*Nazwa firmy'
                     tooltip='Przykładowy tekst'
                  />
               }
               name='companyName'
               rules={[
                  {
                     required: true,
                     message: '*Nazwa firmy jest polem wymaganym',
                  },
               ]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Adres email'
               name='email'
               rules={[{ required: true }, { type: 'email' }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Telefon'
               name='phone'
               rules={[{ required: true }, phoneValidationRule]}
               {...formItemCommonProps}
            >
               <InputPhoneNumber />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Termin składania ofert'
               name='offerDeadline'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <DatePickerElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Kwota wadium'
               name='depositPrice'
               rules={[{ required: true }, priceValidationRule]}
               {...formItemCommonProps}
            >
               <InputPriceElement name='depositPrice' formRef={formRef} />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Szacunkowa wartość kontraktu'
               name='contractValue'
               rules={[{ required: true }, priceValidationRule]}
               {...formItemCommonProps}
            >
               <InputPriceElement name='contractValue' formRef={formRef} />
            </Form.Item>

            <Form.Item
               label='*Konsorcjum'
               name='consortium'
               rules={[{ required: true }]}
            >
               <Radio.Group>
                  <Radio value={1}>Tak</Radio>
                  <Radio value={0}>Nie</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Status konsorcjum'
               name='consortiumStatus'
               hidden={consortiumFieldValue !== 1}
               rules={[{ required: consortiumFieldValue === 1 }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='*Okres gwarancji i rękojmi'
               name='warrantyPeriod'
               rules={[{ required: true }]}
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Znak sprawy / link'
               name='caseSign'
               {...formItemCommonProps}
            >
               <InputElement />
            </Form.Item>

            <Form.Item<DepositReportFormData>
               label='Załączniki'
               name='files'
               {...formItemCommonProps}
            >
               <Upload.Dragger multiple onChange={validateUploadFiles}>
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
                                new Error(
                                   'Akceptacja polityki prywatności jest wymagana',
                                ),
                             ),
                  },
               ]}
            >
               <Checkbox>
                  *Zapoznałem się oraz akceptuję{' '}
                  <Link
                     className='form-link'
                     href='https://aspergo.pl/wp-content/uploads/2022/10/Polityka-prywatnosci-klienci-ASPERGO-RODO-2018.pdf'
                     target='_blank'
                     title='polityka prywatności'
                  >
                     politykę prywatności
                  </Link>
               </Checkbox>
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
