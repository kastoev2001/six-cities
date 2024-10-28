import { inject, injectable } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../libs/rest/index.js';

import { BaseContrller } from '../../libs/rest/controller/base-controller.abstract.js';
import { CommentService } from './comment-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';

@injectable()
export class CommentController extends BaseContrller {
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
    const result = await this.commentService.find();

    this.ok(res, result);
  }

  public create = (_req: Request, _res: Response) => {
    // Код обработки
  }
}
