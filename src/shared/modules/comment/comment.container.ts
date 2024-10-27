import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/index.js';
import { Controller } from '../../libs/rest/index.js';

import { CommentModel, CommentEntity } from './comment.entity.js';
import { CommentController } from './comment.controller.js';

export const createCommentContainer = () => {
  const commentContainer = new Container();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
};
