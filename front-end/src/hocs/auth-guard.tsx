import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../store/store';
import { Navigate, useLocation } from 'react-router-dom';

const withAuthGuard = <T extends object = {}>(
  Component: FC<T>,
  { needAuth = true } = {}
) => observer<T>((props) => {
  const authStore = useAuth();

  const location = useLocation();

  if (needAuth && !authStore.isAuhtenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Component {...props} />;
});

export default withAuthGuard;
