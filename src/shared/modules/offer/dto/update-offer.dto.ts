import { OfferImages, OfferValueType } from '../../../types/index.js';

export class UpdateOfferDto {
  title?: string;
  description?: string;
  postDate?: Date;
  city?: string;
  previewImage?: string;
  offerImages?: OfferImages;
  isPremium?: boolean;
  isFavorite?: boolean;
  housingType?: OfferValueType;
  rootsCount?: number;
  guestsCount?: number;
  price?: number;
  facilities?: string[];
  commentsCount?: number;
  coordinates?: string[];
}