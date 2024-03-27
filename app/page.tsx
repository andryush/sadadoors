'use client';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LabelInputContainer } from '@/components/ui/label-input-container';
import { BottomGradient } from '@/components/ui/bottom-gradient';

export default function BackgroundBeamsDemo() {
  return (
    <>
      <div className='shadow-input relative z-50 mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8'>
        <form className='my-8' onSubmit={() => {}}>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' placeholder='jane@doe.com' type='email' />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' placeholder='••••••••' type='password' />
          </LabelInputContainer>
          <button
            className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />
        </form>
      </div>
      <div className='z-0'>
        <BackgroundBeams />
      </div>
    </>
  );
}
