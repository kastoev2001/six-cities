import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

import { Logger } from '../../logger/index.js';
import { Controller } from './controller.interface.js';
import { Route } from '../types/route.interface.js';

@injectable()
export abstract class BaseContrller implements Controller {
  private readonly _rotuter: Router;

  constructor(
    protected readonly logger: Logger,
  ) {
    this._rotuter = Router();
  }

  get router() {
    return this._rotuter;
  }

  public addRoute = (route: Route) => {
    this._rotuter[route.method](route.path, route.handler);
    this.logger.info(`Route registered: ${route.method.toLowerCase()} ${route.path}`);
  };

  public send = <T>(res: Response, statusCode: number, data: T) => res
    .type('application/json')
    .status(statusCode)
    .json(data);

  public ok = <T>(res: Response, data: T) => this.send(res, StatusCodes.OK, data);
  
  public created = <T>(res: Response, data: T) => this.send(res, StatusCodes.CREATED, data);
  
  public noContent = <T>(res: Response, data: T) => this.send(res, StatusCodes.NO_CONTENT, data);
}
