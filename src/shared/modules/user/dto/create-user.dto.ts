import { UserValueType } from '../../../types/index.js';

export class CreateUserDTO {
  email!: string;
  username!: string;
  avatar!: string;
  type!: UserValueType;
  password!: string;
}
