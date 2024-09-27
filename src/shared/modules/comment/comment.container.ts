import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentModel, CommentEntity } from './comment.entity.js';
import { Component } from '../../types/index.js';

export const createCommentContainer = () => {
  const commentContainer = new Container();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
};
