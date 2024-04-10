'use client';
import sadaLogo from '@/public/images/sada-logo.png';
import Image from 'next/image';
import { ChevronRight, DoorOpen, Folder, Package } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { redirect, usePathname } from 'next/navigation';
import { ADMIN_ROUTES } from '@/constants';
import {
  menuItemIconStyle,
  menuItemSecondaryIconStyle,
  menuItemStyle,
} from './styles';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const isInProductsPage = pathname === ADMIN_ROUTES.products;
  const isInCategoriesPage = pathname === ADMIN_ROUTES.categories;

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!user && !loading) {
    redirect(ADMIN_ROUTES.signIn);
  }

  return (
    <div className='h-min-screen h-screen w-screen bg-black p-2'>
      <div className='flex h-full w-full gap-2 bg-black'>
        <aside className='flex flex-col rounded-xl border-2 border-zinc-800 bg-black'>
          <div className='mx-4 flex h-20 items-center'>
            <Link href={'/'}>
              <Image
                alt='Sada doors logo'
                src={sadaLogo}
                className='max-w-48 bg-cover'
              />
            </Link>
          </div>
          <div className='ml-4 mr-2 mt-4 flex flex-1 flex-col gap-2'>
            <Link href={ADMIN_ROUTES.products}>
              <div
                className={`${menuItemStyle} ${isInProductsPage && 'font-bold'}`}
              >
                <Package
                  className={`${menuItemIconStyle} ${isInProductsPage && 'fill-purple-600'}`}
                />
                <p>Products</p>
                <ChevronRight
                  className={`${menuItemSecondaryIconStyle} ${isInProductsPage && 'opacity-100'}`}
                />
              </div>
            </Link>
            <Link href={ADMIN_ROUTES.categories}>
              <div
                className={`${menuItemStyle} ${isInCategoriesPage && 'font-bold'}`}
              >
                <Folder
                  className={`${menuItemIconStyle} ${isInCategoriesPage && 'fill-purple-600'}`}
                />
                <p>Categories</p>
                <ChevronRight
                  className={`${menuItemSecondaryIconStyle} ${isInCategoriesPage && 'opacity-100'}`}
                />
              </div>
            </Link>
            <div
              onClick={handleSignOut}
              className={`${menuItemStyle} mb-4 mt-auto`}
            >
              <DoorOpen className={menuItemIconStyle} />
              <p>Sign Out</p>
              <ChevronRight className={menuItemSecondaryIconStyle} />
            </div>
          </div>
        </aside>
        <main className=' w-full flex-1 rounded-xl border-2 border-zinc-800 bg-black'>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
