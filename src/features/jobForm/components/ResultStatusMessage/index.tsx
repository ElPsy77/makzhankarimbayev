import React, { ReactElement } from 'react';
import Alert from 'antd/lib/alert';
import { FormResultStatus } from '../../types';

type ResultStatusMessageProps = {
   status: FormResultStatus;
   validationErrors: string[] | null;
};

const ResultStatusMessage = ({
   status,
   validationErrors,
}: ResultStatusMessageProps): ReactElement<ResultStatusMessageProps> => {
   return (
      <>
         {status === FormResultStatus.SUCCESSS ? (
            <Alert
               className='text-base'
               message='Заявка была отправлена'
               type='success'
               showIcon
            />
         ) : null}

         {status === FormResultStatus.ERROR ? (
            <Alert
               message={
                  validationErrors === null || !validationErrors.length ? (
                     'Возникла проблема при отправке заявки, пожалуйста, свяжитесь с администратором'
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
      </>
   );
};

export default ResultStatusMessage;
