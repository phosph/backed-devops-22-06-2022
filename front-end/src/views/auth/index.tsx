import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@store/store';
import { observer } from 'mobx-react-lite';

const Auth: FC = observer(() => {
  const authStore = useAuth();

  if (authStore.isAuhtenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className='p-5 h-screen'>
      <Outlet />
    </div>
  );
});

export default Auth;
