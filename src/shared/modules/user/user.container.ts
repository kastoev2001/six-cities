import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { UserModel } from './user.entity.js';

export const createUserContainer = (): Container => {
  const userContainer = new Container();

  userContainer.bind<types.ModelType<UserModel>>(Component.UserModel).toConstantValue(UserModel)

  return userContainer;
};
