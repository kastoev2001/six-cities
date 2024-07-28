import { UserType } from './housing-type.const.js';

export type User = {
  username: string;
  email: string;
  avatar: string;
  type: typeof UserType[keyof typeof UserType]
}
