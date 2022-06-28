import { RouteObject, Navigate } from 'react-router-dom';
import Auth from '@views/auth';
import Home from '@views/home';
import Login from '@views/login';
import SignUp from '@views/signup';
import Account from '@views/account';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: '*', element: <Navigate replace to="/auth/login" /> },
      { path: '', element: <Navigate replace to="/auth/login" /> },
    ],
  },
  {
    path: 'account',
    element: <Account />,
  }
];

export default routes;
