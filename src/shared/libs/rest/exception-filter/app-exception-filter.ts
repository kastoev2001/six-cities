import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/http-error.js';
import { createObjectError } from '../../../helpers/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Register AppExceptionFilter.');
  }

  private handlerHttpError = (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} - ${error.message}`, error);

    res
      .status(error.httpStatusCode)
      .send(createObjectError(error.message));
  };

  private handlerOtherError = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createObjectError(error.message));
  };

  public catch = (error: Error | HttpError, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof HttpError) {
      return this.handlerHttpError(error, req, res, next);
    }

    this.handlerOtherError(error, req, res, next);
  };
}
