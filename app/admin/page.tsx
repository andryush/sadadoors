import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/admin/sign-in');
  return <div>page</div>;
};

export default Page;
