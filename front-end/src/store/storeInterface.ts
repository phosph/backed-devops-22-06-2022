import type { AuthStore } from './auth'
import type { UserStore } from './user'

export interface Store {
  auth: AuthStore;
  user: UserStore;
}


export interface StorePart {
  $root: Store;

  onInit(rootStoreInstance: Store): void
}

export const objImplementsStorePart = (obj: any): obj is StorePart => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && 'onInit' in obj
}
