import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';

export const createOfferContainer = () => {
  const userContainer = new Container();
  userContainer.bind<ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  userContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();

  return userContainer;
};
