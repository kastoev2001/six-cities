import { UserType } from './housing-type.const.js';

type user = typeof UserType

export type UserValueType = typeof UserType[keyof typeof UserType]

export type User = {
  username: string;
  email: string;
  avatar: string;
  type: UserValueType
}
