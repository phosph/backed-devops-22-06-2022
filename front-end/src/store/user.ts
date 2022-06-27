import { makeAutoObservable, runInAction } from 'mobx';
import { pathToAbsUrl } from '@shared/utils'
import { IUser } from "@shared/user"
import { StorePart, Store } from './storeInterface'
import { ServerUserError } from '@shared/ServerUserError'

interface IUserRaw extends Omit<IUser, 'date_joined'> {
    date_joined: string,
}

export interface IUpdateUserData {
  username: string,
  email_list: { id?: number, email: string, main: boolean }[]
}

export class UserStore implements StorePart {
  private _userData: IUser | null = null;

  $root!: Store;

  constructor() { makeAutoObservable(this); }

  // lifecycle
  onInit(rootStoreInstance: Store) {
    this.$root = rootStoreInstance
  }

  get userData() { return this._userData }

  async getUser() {
    if (!this.$root.auth.isAuhtenticated) throw new Error('need to be auth!')

    const headers = new Headers({
      Authorization: this.$root.auth.token!,
    });

    const user: IUserRaw = await fetch(pathToAbsUrl('user/'), {
      method: 'GET',
      headers,
    }).then(response => {
      if (!response.ok) throw new ServerUserError(`HTTP error! Status: ${response.status}`, response);

      return response.json() as Promise<IUserRaw>
    })

    const userParsed: IUser = {
      ...user,
      date_joined: new Date(user.date_joined)
    }

    return runInAction(() => {
      this._userData = userParsed
      return this._userData
    })
  }

  async updateUser(data: IUpdateUserData) {
    if (!this.$root.auth.isAuhtenticated) throw new Error('need to be auth!')

    const body = JSON.stringify(data)

    const headers = new Headers({
      Authorization: this.$root.auth.token!,
      'Content-Type': 'application/json'
    });

    const user: IUserRaw = await fetch(pathToAbsUrl('user/'), {
      method: 'PUT',
      body,
      headers,
    }).then(response => {
      if (!response.ok) throw new ServerUserError(`HTTP error! Status: ${response.status}`, response);

      return response.json() as Promise<IUserRaw>
    })

    const userParsed: IUser = {
      ...user,
      date_joined: new Date(user.date_joined)
    }

    return runInAction(() => {
      this._userData = userParsed
      return this._userData
    })
  }
}
