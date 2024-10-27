import { inject, injectable } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { HttpMethod } from '../../libs/rest/index.js';

import { BaseContrller } from '../../libs/rest/controller/base-controller.abstract.js';
import { Logger } from 'pino';

@injectable()
export class CommentController extends BaseContrller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register route for CategoryController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public index = () => {
    // Код обработки
  }

  public create = () => {
    // Код обработки
  }
}
