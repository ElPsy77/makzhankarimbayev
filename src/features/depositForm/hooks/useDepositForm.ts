import { getUploadsFilesAsFormData } from '@/helpers/getUploadsFilesAsFormData';
import { UploadPostResponseData } from '@/pages/api/uploads';
import { DepositReportData } from '@/types/depositReports';
import { FormInstance, FormProps } from 'antd/lib/form';
import { UploadFile } from 'antd/lib/upload';
import { useState } from 'react';
import { FormResultStatus } from '../components/ResultStatusMessage';
import { sendFormDataAction } from '../services/api/sendFormDataAction';
import { uploadFilesAction } from '../services/api/uploadFilesAction';

export type DepositReportFormData = {
   files?: {
      fileList: UploadFile[];
   };
} & Omit<DepositReportData, 'fileUrl'>;

type DepositFormHookResult = {
   formResultStatus: FormResultStatus | null;
   validationErrors: string[] | null;
   isButtonLoading: boolean;
   sendFormData: FormProps<DepositReportFormData>['onFinish'];
   setFormError: FormProps<DepositReportFormData>['onFinishFailed'];
   resetFormStatus: () => void;
};

export const useDepositForm = (
   formRef: FormInstance,
): DepositFormHookResult => {
   const [formResultStatus, setFormResultStatus] =
      useState<FormResultStatus | null>(null);

   const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

   const setSuccessFormStatus = (): void => {
      setIsButtonLoading(false);

      setFormResultStatus(FormResultStatus.SUCCESSS);
   };

   const setErrorFormStatus = (): void => {
      setIsButtonLoading(false);

      setFormResultStatus(FormResultStatus.ERROR);
   };

   const resetFormStatus = (): void => {
      setFormResultStatus(null);
   };

   const sendFormData: FormProps<DepositReportFormData>['onFinish'] = async (
      formValues: DepositReportFormData,
   ): Promise<void> => {
      setIsButtonLoading(true);

      let uploadNames: string | null = null;

      const { files, ...restFormValues } = formValues;

      if (files && files.fileList.length > 0) {
         const formData = getUploadsFilesAsFormData(files);

         try {
            const response = await uploadFilesAction(formData);

            if (!response.ok) {
               setErrorFormStatus();

               return;
            }

            const responseData: UploadPostResponseData = await response.json();

            uploadNames = responseData.uploadNames;
         } catch (err) {
            console.error(err);

            setErrorFormStatus();

            return;
         }
      }

      try {
         const response = await sendFormDataAction(restFormValues, uploadNames);

         if (!response.ok) {
            setErrorFormStatus();

            return;
         }

         formRef.resetFields();

         setSuccessFormStatus();
      } catch (err) {
         console.error(err);

         setErrorFormStatus();
      }
   };

   const setFormError: FormProps<DepositReportFormData>['onFinishFailed'] = (
      errorInfo,
   ) => {
      console.error(errorInfo);

      setErrorFormStatus();
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

   return {
      formResultStatus,
      validationErrors,
      isButtonLoading,
      sendFormData,
      setFormError,
      resetFormStatus,
   };
};
