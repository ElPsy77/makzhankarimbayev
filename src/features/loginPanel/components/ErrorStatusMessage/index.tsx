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
               message='Неверный логин или пароль'
               type='error'
               showIcon
            />
         ) : (
            <Alert
               message='Произошла ошибка при входе, пожалуйста, обратитесь к администратору'
               type='error'
               showIcon
            />
         )}
      </>
   );
};

export default ErrorStatusMessage;
