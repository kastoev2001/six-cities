import { inject, injectable } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { HttpMethod, BaseController } from '../../libs/rest/index.js';
import { CommentService } from './comment-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register route for CategoryController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public index = async (_req: Request, res: Response): Promise<void> => {
    this.logger.info('Geting comments...');
    const comments = await this.commentService.find();
    this.logger.info('Geted comments!');
    this.ok(res, comments);
  }

  public create = (_req: Request, _res: Response) => {
    // Код обработки
  }
}
