import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes'
import { HttpError } from '../errors/http-error.js';
import { createObjectError } from '../../../helpers/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Register AppExceptionFilter.');
  }

  private handlerHttpError = (Status) => {

  }
  private handlerOtherError = () => {}

  public catch = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: error.message});
  }

}