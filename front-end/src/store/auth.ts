import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

interface AuthData {
    username: string,
    email: string,
    age: number,
    token: string
}

export class AuthStore {
  _authData: AuthData | null = null;

  get authData() {
    return this._authData;
  }

  constructor() {
    console.log('AuthStore');
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'AuthStore',
      properties: ['_authData'],
      storage: window.localStorage,
      expireIn: 259200000, // 3 days in millsesconds
      removeOnExpiration: true,
      debugMode: false,
    });
  }

  get isAuhtenticated(): boolean {
    console.log('isAuhtenticated', !!this.authData);
    return this.authData !== null;
  }

  async login(username: string, password: string) {
    const body: AuthData = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());

    console.log(body);

    runInAction(() => {
      this._authData = Object.seal(body);
    });
  }

  logout() {
    this._authData = null
  }
}
