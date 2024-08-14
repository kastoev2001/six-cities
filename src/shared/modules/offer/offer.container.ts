import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';

export const createOfferContainer = () => {
  const userContainer = new Container();
  userContainer.bind<ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return userContainer;
}