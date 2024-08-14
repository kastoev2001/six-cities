import { DocumentType } from '@typegoose/typegoose'
import { Component } from '../../types/component.enum.js'
import { OfferService } from './offer-service.interface.js'
import { injectable, inject } from 'inversify'
import { OfferEntity } from './offer.entity.js'
import { CreateOfferDTO } from './dto/create-offer.dto.js'
import { ModelType } from '@typegoose/typegoose/lib/types.js'

injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModule: ModelType<OfferEntity>,
  ) {}

  public create = async (dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> => {
    return this.offerModule.create(dto);
  }

  public findById = async (id: string): Promise<DocumentType<OfferEntity> | null> => {
    const existedOffer = await this.offerModule.findById(id);
    const isExistedOffer = !!existedOffer;

    if (!isExistedOffer) {
      return null;
    }

    return existedOffer;
  }
}
