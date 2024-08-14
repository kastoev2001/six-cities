import { DocumentType } from "@typegoose/typegoose";
import { UserEntity } from './user.entity.js';
import { CreateUserDTO } from './dto/create-user.dto.js';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  createOrFindByEmail(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
}
