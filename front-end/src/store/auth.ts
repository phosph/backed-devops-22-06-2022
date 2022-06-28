import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { ILoginData, ISignUpData } from '@shared/auth'
import { pathToAbsUrl } from '@shared/utils'

interface AuthData {
    token: string,
    expiry: Date
}
interface AuthDataRaw {
    token: string,
    expiry: string
}

export class AuthStore {
  // store
  _authData: AuthData | null = null;

  // computeds & getters
  get isAuhtenticated(): boolean {
    console.log('isAuhtenticated', !!this.authData);
    return this.authData !== null;
  }

  get token() {
    if (!this.isAuhtenticated) return null
    return `Token ${this._authData!.token}`
  }

  get authData() {
    return this._authData;
  }

  constructor() {
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

  // actions
  async login(data: ILoginData) {
    const headers = new Headers({
      Authorization: `Basic ${btoa(`${data.username}:${data.password}`)}`,
    })

    const authData: AuthData = await fetch(pathToAbsUrl('/auth/login/'), {
      method: 'POST',
      headers,
    }).then(r => {
      if (!r.ok) throw new Error(`HTTP error! Status: ${r.status}`);

      return r.json()
    }).then((r: AuthDataRaw): AuthData => ({
      ...r,
      expiry: new Date(r.expiry),
    }));

    runInAction(() => {
      this._authData = Object.seal(authData);
    });
  }

  // TODO
  async signup({email, ...data}: ISignUpData) {
    const body = JSON.stringify({
      ...data,
      email_list: [{ email, main: true }]
    })

    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    const response = await fetch(pathToAbsUrl('/auth/signup/'), {
      method: 'POST',
      body,
      headers,
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return this.login(data)
  }
  //****//

  async logout() {
    if (!this.isAuhtenticated) return;
    try {
      const headers = new Headers({
        Authorization: this.token!,
      });


      const response = await fetch(pathToAbsUrl('/auth/logout/'), {
        method: 'POST',
        headers,
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    } finally {
      runInAction(() => {
        this._authData = null;
      });
    }

  }
}
