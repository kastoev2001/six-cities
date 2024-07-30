import {defaultClasses, prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { User, UserValueType } from '../../types/index.js';
import { UserType } from '../../types/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User  {
  @prop({
    uniquie: true,
    require: true,
    default: '',
  })
  public username!: string;

  @prop({
    required: true,
    default: '',
  })
  public email!: string;
  
  @prop({
    required: true,
    default: '',
  })
  public avatar!: string;

  @prop({
    type: () =>  String,
    enum: Object.values(UserType)

  })
  public type!: UserValueType;
}

export const UserModel = getModelForClass(UserEntity);
