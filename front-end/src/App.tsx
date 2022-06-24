import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import StoreProvider from './store/store';
import './App.css';

export interface Props {}

const App: FC<Props> = () => {
  const routeEl = useRoutes(routes);
  return (
    <div className="App">
      <StoreProvider>
        {routeEl}
      </StoreProvider>
    </div>
  );
};

export default App;
