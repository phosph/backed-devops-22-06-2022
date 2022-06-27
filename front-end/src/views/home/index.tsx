import withAuthGuard from '@/hocs/auth-guard';
import Header from '@components/header'
import { RouteObject, Navigate } from 'react-router-dom';

const Home = withAuthGuard(() => {
  return (
    <>
      <Header />
      {/*
      <main className="min-h-screen px-8 py-2 text-white">
        <div>Home</div>
      </main>
      */}
      <Navigate to="/account" />
    </>
  );
});

export default Home;
