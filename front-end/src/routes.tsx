import { FC } from 'react'
import {
  RouteObject,
  Navigate,
  Outlet,
  useMatch,
  useResolvedPath,
  useLocation,
} from 'react-router-dom';
import Auth from './components/auth'
import Home from './components/home'
import Login from './components/login'
import SignUp from './components/signup';


const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: '*', element: <Navigate replace to="./login" /> },
    ],
  },
];

export default routes;