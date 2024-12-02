import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { Component } from '../../types/component.enum.js';

import { HttpMethod, BaseController } from '../../libs/rest/index.js';
import { CommentService } from './comment-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { StatusCodes } from 'http-status-codes';

import { fillDTO } from '../../helpers/common.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register route for CategoryController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public index = async (_req: Request, res: Response): Promise<void> => {
    const comments = await this.commentService.find();
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
    this.logger.info('Object comment created.')
  }

  public create = async (
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ) => {
    const existComment = await this.commentService.findByName('asdf');

    if (existComment) {
      const existCoomentError = new Error(`Comment with name ${body} exists.`)
      this.send(
        res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        { error: existCoomentError.message }
      );

      return this.logger.error(existCoomentError.message, existCoomentError);
    }
    
  }
}
