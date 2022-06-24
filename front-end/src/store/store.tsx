// import { observer } from 'mobx-react-lite';
import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from 'react';
import { AuthStore } from './auth'

interface Store {
  auth: AuthStore;
}

const StoreContext = createContext<Store | null>(null);

export const useStore = (): Store => {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error('useStore must be used in StoreContext children');
  }
  return store;
};


export const useAuth = (): Store['auth'] => useStore().auth;


const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store] = useState<Store>(() => ({
    auth: new AuthStore(),
  }));

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
