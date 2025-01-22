import React, { ReactElement } from 'react';
import Alert from 'antd/lib/alert';

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
               message='Login or password is incorrect'
               type='error'
               showIcon
            />
         ) : (
            <Alert
               message='There was a problem logging in, please contact your administrator'
               type='error'
               showIcon
            />
         )}
      </>
   );
};

export default ErrorStatusMessage;
