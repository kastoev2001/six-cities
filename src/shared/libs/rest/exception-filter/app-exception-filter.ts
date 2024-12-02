import { inject, injectable } from 'inversify';
import { ExecptionFilter } from './exception-filter.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes'

@injectable()
export class AppExceptionFilter implements ExecptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Register AppExceptionFilter.');
  }
  
  public catch = (error: Error, _req: Request, res: Response, next: NextFunction): void => {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: error.message});
  }

}