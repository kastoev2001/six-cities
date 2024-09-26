import { DocumentType, types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { MAX_COMMENT_COUNT } from './comment.constants.js';

import { injectable, inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.Logger) private readonly logger: Logger
  ) {}
  
  public create = async (dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> => {
    const result = await this.commentModel.create(dto);
    this.logger.info('Create comment.');
    return result;
  }

  public find = async (count: number): Promise<DocumentType<CommentEntity>[]> => {
    const limit = count ?? MAX_COMMENT_COUNT;
    return this.commentModel
      .find();
  }
}
