import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) { }

  public create = async (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> => {
    const user = new UserEntity(dto);

    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  };

  public findByEmail = async (email: string): Promise<DocumentType<UserEntity> | null> => this.userModel.findOne({ email });

  public findById = async (id: string): Promise<DocumentType<UserEntity> | null> => this.userModel.findById(id);

  public createOrFindByEmail = async (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> => {
    const findedUser = await this.userModel.findOne({ email: dto.email });
    const isExistedUser = !!findedUser;

    if (isExistedUser) {
      return findedUser;
    }

    return await this.create(dto, salt);
  };
}
