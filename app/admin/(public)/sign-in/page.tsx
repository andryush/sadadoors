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
import { emailSchema, passwordSchema } from '@/schemas';
import { Spinner } from '@/components/ui/spinner';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | null>
  >({
    email: null,
    password: null,
  });

  const { user } = useAuth();

  const hasErrors = Object.values(validationErrors).some(Boolean);
  const isDisabled = hasErrors || loading || !email || !password;

  const handleChangeEmail = (value: string): void => {
    setEmail(value);
    setValidationErrors((prev) => ({ ...prev, email: null }));
    const res = emailSchema.safeParse(value);
    if (!res.success) {
      setValidationErrors((prev) => ({
        ...prev,
        email: res.error.errors[0].message,
      }));
    }
  };

  const handleChangePassword = (value: string): void => {
    setPassword(value);
    setValidationErrors((prev) => ({ ...prev, password: null }));
    const res = passwordSchema.safeParse(value);
    if (!res.success) {
      setValidationErrors((prev) => ({
        ...prev,
        password: res.error.errors[0].message,
      }));
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Success');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
            <p className='text-sm text-red-500'>{validationErrors.email}</p>
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='••••••••'
              type='password'
              onChange={(e) => handleChangePassword(e.target.value)}
            />
            <p className='text-sm text-red-500'>{validationErrors.password}</p>
          </LabelInputContainer>
          <button
            disabled={isDisabled}
            onClick={() => handleSignIn()}
            className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:cursor-not-allowed dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          >
            {loading ? (
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                <Spinner />
              </div>
            ) : (
              'Sign in'
            )}
            <BottomGradient />
          </button>
          <div
            className={`my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent ${isDisabled ? 'dark:via-red-600' : 'dark:via-green-600'} `}
          />
        </div>
      </div>
      <div className='z-0'>
        <BackgroundBeams />
      </div>
    </>
  );
}
