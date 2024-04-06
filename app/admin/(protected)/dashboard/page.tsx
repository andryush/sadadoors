'use client';
import { auth } from '@/app/firebase/config';
import { ADMIN_ROUTES } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { redirect } from 'next/navigation';

const Page = () => {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!user && !loading) {
    redirect(ADMIN_ROUTES.signIn);
  }

  return (
    <>
      <div>(PROTECTED)Dashboard page</div>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Page;
