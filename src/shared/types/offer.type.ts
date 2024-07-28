import { HousingType } from './housing-type.const.js';
import { User } from './user.type.js';

type OfferImages = string[];

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  offerImages: OfferImages;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: typeof HousingType[keyof typeof HousingType]
  rootsCount: number;
  guestsCount: number;
  price: number;
  facilities: string[];
  commentsCount: number;
  coordinates: string[];
  user: User;
}
