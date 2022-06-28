// import { observer } from 'mobx-react-lite';
import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from 'react';
import { AuthStore } from './auth'
import { UserStore } from './user'
import { Store, objImplementsStorePart } from './storeInterface'

const StoreContext = createContext<Store | null>(null);

export const useStore = (): Store => {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error('useStore must be used in StoreContext children');
  }
  return store;
};


export const useAuth = (): Store['auth'] => useStore().auth;
export const useUser = (): Store['user'] => useStore().user;

const createRootStore = (): Store => {
  const a = [
    ['auth' as const, new AuthStore()] as const,
    ['user' as const, new UserStore()] as const,
  ]

  const store = Object.fromEntries(a)

  for (let [_, part] of a) {
    if (objImplementsStorePart(part)) part.onInit(store);
  }

  return store
}


const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store] = useState<Store>(createRootStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
