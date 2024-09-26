import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js'
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  find(count: number): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
