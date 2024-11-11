import Alert from 'antd/lib/alert';
import React, { ReactElement } from 'react';

type ResultStatusMessageProps = {
   status: number;
};

const ErrorStatusMessage = ({
   status,
}: ResultStatusMessageProps): ReactElement<ResultStatusMessageProps> => {
   return (
      <>
         {status === 401 ? (
            <Alert
               message='Login lub hasło jest nieprawidłowe'
               type='error'
               showIcon
            />
         ) : (
            <Alert
               message='Wystąpił problem z logowanie, proszę skontaktować się z administratorem.'
               type='error'
               showIcon
            />
         )}
      </>
   );
};

export default ErrorStatusMessage;
