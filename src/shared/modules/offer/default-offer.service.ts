import { DocumentType } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { injectable, inject } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { Logger } from '../../libs/logger/index.js';
import { MAX_OFFER_COUNT } from './offer.constants.js';
import { SortType } from '../../types/sort-type.enum.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

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

  public deleteById = async (id: string): Promise<DocumentType<OfferEntity> | null> => {
    return this.offerModule.findByIdAndDelete(id).exec();
  }

  public find = async (count: number): Promise<DocumentType<OfferEntity>[]> => {
    const limit = count ?? MAX_OFFER_COUNT;
    
    return this.offerModule
      .find()
      .sort({createAt: SortType.Down})
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModule
      .findByIdAndUpdate(offerId, {$inc: {
        commentCount: 1
      }})
      .exec();
  }
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModule
      .findByIdAndUpdate(id, dto, {new: true})
      .populate(['userId'])
      .exec();
  }
}
