import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { HttpMethod } from '../../libs/rest/index.js';
import { Request, Response } from 'express';
import { UserService } from './user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js'
import { StatusCodes } from 'http-status-codes';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userSerivce: UserService,
  ) {
    super(logger);

    this.logger.info('Register route for UserController...');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create })
  }

  private create = async (
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response) => {
    // const isExistUser = !!this.userSerivce.findByEmail(body.email);

    // if (isExistUser) {
    //   const existUserError = new Error(`User with email ${body.email} exists.`);
    //   this.send(
    //     res,
    //     StatusCodes.UNPROCESSABLE_ENTITY,
    //     {error: existUserError.message}
    //   )
    // }

    throw new Error('[UserController] Oops');
  }

}