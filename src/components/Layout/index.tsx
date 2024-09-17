import { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/assets/logo.svg';

type LayoutProps = {
   children: ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps> => (
   <div>
      <header className='bg-white px-8 py-4 mb-12 shadow-sm flex justify-between items-center'>
         <Image src={logo} alt='logo aspergo' width={105} height={54} />

         <Link
            href='https://aspergo.pl/kontakt/'
            title='kontakt'
            target='_blank'
            className='transition-colors hover:text-brown'
         >
            Kontakt
         </Link>
      </header>

      <div className='flex justify-center mb-12'>
         <div className='container bg-white px-10 py-8 rounded-2xl'>
            {children}
         </div>
      </div>
   </div>
);

export default Layout;
