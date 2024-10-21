import { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../../../public/assets/logo.svg';
import { signOut, useSession } from 'next-auth/react';
import { Button } from 'antd';

type LayoutProps = {
   children: ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps> => {
   const { data: session } = useSession();

   return (
      <div>
         <header className='bg-white px-8 py-4 mb-12 shadow-sm flex justify-between items-center'>
            <Logo className='w-28 h-14' />

            <div>
               {session ? (
                  <Button
                     onClick={() => {
                        signOut();
                     }}
                     title='Wyloguj'
                     className='mr-5'
                  >
                     Wyloguj
                  </Button>
               ) : null}

               <Link
                  href='https://aspergo.pl/kontakt/'
                  title='kontakt'
                  target='_blank'
                  className='transition-colors hover:text-brown'
               >
                  Kontakt
               </Link>
            </div>
         </header>

         <div className='flex justify-center mb-12'>{children}</div>
      </div>
   );
};

export default Layout;
