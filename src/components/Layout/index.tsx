import { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from 'antd';

import Logo from '../../../public/assets/logo.svg';

type LayoutProps = {
   children: ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps> => {
   const { data: session } = useSession();

   const signInButton = (
      <Button href='/login-panel' title='Sign in'>
         Sign in
      </Button>
   );

   const signOutButton = (
      <Button
         onClick={() => {
            signOut();
         }}
         title='Sign out'
      >
         Sign out
      </Button>
   );

   const linkCommonStyles =
      'transition-colors hover:text-brown mr-5 max-medium:mr-5 max-medium:text-sm';

   return (
      <div>
         <header className='bg-white px-8 py-4 mb-12 shadow-sm flex justify-between items-center max-medium:flex-col'>
            <Link href='/' className='text-3xl font-bold max-medium:mb-3'>
               ImJobApp.
            </Link>

            <div>
               <Link href='/' title='form' className={linkCommonStyles}>
                  Form
               </Link>

               <Link
                  href='/job-applications'
                  title='applications'
                  className={linkCommonStyles}
               >
                  Applications
               </Link>

               <Link
                  href='https://sebastiangolab.pl/contact'
                  title='contact'
                  target='_blank'
                  className={linkCommonStyles}
               >
                  Contact
               </Link>

               {session ? signOutButton : signInButton}
            </div>
         </header>

         <div className='flex justify-center mb-12'>{children}</div>
      </div>
   );
};

export default Layout;
