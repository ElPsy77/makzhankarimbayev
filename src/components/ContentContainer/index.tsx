import { ReactElement, ReactNode } from 'react';

export type ContentContainerProps = {
   children: ReactNode;
   isFull?: boolean;
   isLogin?: boolean;
};

const ContentContainer = ({
   children,
   isFull,
   isLogin,
}: ContentContainerProps): ReactElement<ContentContainerProps> => (
   <div
      className={`${isFull ? 'w-full px-7' : 'container'} ${isLogin ? 'max-w-96' : ''}`}
   >
      <div className='bg-white px-10 py-8 rounded-2xl w-full'>{children}</div>
   </div>
);

export default ContentContainer;
