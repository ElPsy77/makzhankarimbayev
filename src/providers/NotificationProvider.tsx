import { createContext, ReactElement, ReactNode } from 'react';
import { notification } from 'antd';
import { IconType } from 'antd/lib/notification/interface';

type NotificationProviderProps = {
   children: ReactNode;
};

type NotificationContextValue = {
   showNotification: (
      message: string,
      iconType: IconType,
      duration?: number,
   ) => void;
};

const defaultContextValue = {
   showNotification: () => null,
};

export const NotificationContext =
   createContext<NotificationContextValue>(defaultContextValue);

export const NotificationProvider = ({
   children,
}: NotificationProviderProps): ReactElement<NotificationProviderProps> => {
   const [notificationApi, notificationContext] = notification.useNotification({
      stack: false,
   });

   const showNotification = (
      message: string,
      iconType: IconType,
      duration?: number,
   ) => {
      notificationApi[iconType]({
         message,
         duration: duration || 1,
         placement: 'topRight',
      });
   };

   return (
      <NotificationContext.Provider
         value={{
            showNotification,
         }}
      >
         {notificationContext}
         {children}
      </NotificationContext.Provider>
   );
};
