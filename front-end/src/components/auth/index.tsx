import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@store/store';
import { autorun } from 'mobx'

const Auth: FC = () => {
  const authStore = useAuth();

  if (authStore.isAuhtenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className='p-5'>
      <Outlet />
    </div>
  );
};

export default Auth;
