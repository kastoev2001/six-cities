import { HousingType } from './housing-type.const.js';
import { User } from './user.type.js';

export type OfferImages = string[];
export type OfferValueType = typeof HousingType[keyof typeof HousingType];

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  offerImages: OfferImages;
  isPremium: boolean;
  isFavorite: boolean;
  housingType: OfferValueType;
  rootsCount: number;
  guestsCount: number;
  price: number;
  facilities: string[];
  commentsCount: number;
  coordinates: string[];
  user: User;
}
