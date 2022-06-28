import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import StoreProvider from './store/store';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

export interface Props {}

const App: FC<Props> = () => {
  const routeEl = useRoutes(routes);
  return (
    <div className="App">
      <StoreProvider>
        {routeEl}
      </StoreProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
