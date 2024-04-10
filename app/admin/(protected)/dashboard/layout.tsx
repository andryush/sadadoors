import DashboardLayout from '@/components/layouts/DashboardLayout';
import { PropsWithChildren } from 'react';

const Dashboard = ({ children }: PropsWithChildren) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Dashboard;
