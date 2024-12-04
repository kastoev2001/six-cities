import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { NextFunction, Response } from 'express';
import { UserService } from './user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js'
import { StatusCodes } from 'http-status-codes';
import { CreateUserRequest } from './type/create-user-request.type.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { Config, RestSchema } from '../../config/index.js';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoginUserRequest } from './type/login-user-request.type.js';
import { Request } from 'got';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userSerivce: UserService,
    @inject(Component.RestConfig) private readonly config: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register route for UserController...');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create })
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login })
  }

  private create = async (
    { body }: CreateUserRequest,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const isExistUser = !!await this.userSerivce.findByEmail(body.email);

    if (isExistUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" exist.`,
        `UserController`,
      );
    }

    const result = await this.userSerivce.create(body, this.config.get('SALT'));

    this.created(res, fillDTO(UserRdo, result));
  }

  private login = async (
    { body }: LoginUserRequest,
    _res: Response,
    _next: NextFunction,
  ) => {
    const isExistUser = !!await this.userSerivce.findByEmail(body.email);

    if (isExistUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email} not found."`,
        'UserController'
      )
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      `Not implemented`,
      'UserController',
    )
  }

  private logout = async (_req: Request, _res: Response, _next: NextFunction) => {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      `Not implemented`,
      `UserController`,
    );
  }

  private isLogged = async (_req: Request, _res: Response, _next: NextFunction) => {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      `Not implemented`,
      `UserController`,
    );
  }
}
