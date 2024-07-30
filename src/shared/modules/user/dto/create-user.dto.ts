import { UserValueType } from '../../../types/index.js';

export class CreateUserDto {
  email!: string;
  username!: string;
  avatar!: string;
  type!: UserValueType;
  password!: string;
}
