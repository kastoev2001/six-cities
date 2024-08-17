import { DocumentType } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { injectable, inject } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Logger } from '../../libs/logger/index.js';

injectable();
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModule: ModelType<OfferEntity>,
  ) { }

  public create = async (dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> => {
    const result = await this.offerModule.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  };

  public findById = async (id: string): Promise<DocumentType<OfferEntity> | null> => {
    const existedOffer = await this.offerModule.findById(id);
    const isExistedOffer = !!existedOffer;

    if (!isExistedOffer) {
      return null;
    }

    return existedOffer;
  };
}
