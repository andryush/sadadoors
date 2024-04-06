import { AuthProvider } from '@/context/AuthContext';
import { PropsWithChildren } from 'react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AdminLayout;
