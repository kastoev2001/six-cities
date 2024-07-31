import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { UserEntity, UserModel } from './user.entity.js';

export const createUserContainer = (): Container => {
  const userContainer = new Container();

  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel)

  return userContainer;
};
