import { Users } from './User';

export interface IAppState {
  users: Users;
}

export function createAppState(): IAppState {
  return {
    users: new Users(),
  }
}
