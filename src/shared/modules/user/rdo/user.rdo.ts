import { Expose } from 'class-transformer';
import { UserValueType } from '../../../types/index.js';

export class UserRdo {
  @Expose()
  public email!: string;

  @Expose()
  public username!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public type!: UserValueType;

  @Expose()
  public password!: string;

}
