'use client';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { BottomGradient } from '@/components/ui/bottom-gradient';
import { useState } from 'react';
import { toast } from 'sonner';
import { auth } from '@/app/firebase/config';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ADMIN_ROUTES } from '@/constants';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Success');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (user) {
    redirect(ADMIN_ROUTES.dashboard);
  }

  return (
    <>
      <div className='relative z-50 mx-auto w-full max-w-md rounded-none bg-white shadow-input dark:bg-black md:rounded-2xl'>
        <div className='absolute my-8 mt-[50%] w-full'>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='jane@doe.com'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
          <button
            onClick={() => handleSignIn()}
            className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          >
            Sign in &rarr;
            <BottomGradient />
          </button>

          <div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />
        </div>
      </div>
      <div className='z-0'>
        <BackgroundBeams />
      </div>
    </>
  );
}
