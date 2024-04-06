import { ADMIN_ROUTES } from '@/constants';
import { redirect } from 'next/navigation';

const Page = () => {
  redirect(ADMIN_ROUTES.signIn);
};

export default Page;
