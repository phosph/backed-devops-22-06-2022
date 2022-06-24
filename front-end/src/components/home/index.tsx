import { useState } from 'react';
import withAuthGuard from '@/hocs/auth-guard';
import { Link } from 'react-router-dom';
import { useAuth } from '@store/store';

const Home = withAuthGuard(() => {
  const [count, setCount] = useState(0);
  const authStore = useAuth();

  return (
    <>
      <header className="App-header text-white py-2 px-8 shadow flex gap-3">
        <Link to="/auth/login" className="inline-block">
          login
        </Link>
        <Link to="/auth/signup" className="inline-block">
          signup
        </Link>
        <button
          className="inline-block"
          type="button"
          onClick={() => authStore.logout()}
        >
          logout
        </button>
      </header>
      <main>
        <div>Home</div>
      </main>
    </>
  );
});

export default Home;
