import { OfferImages, OfferValueType } from '../../../types/index.js';

export class CreateOfferDTO {
  title!: string;
  description!: string;
  postDate!: Date;
  city!: string;
  previewImage!: string;
  offerImages!: OfferImages;
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  housingType!: OfferValueType;
  rootsCount!: number;
  guestsCount!: number;
  price!: number;
  facilities!: string[];
  commentsCount!: number;
  coordinates!: string[];
  user!: string;
}