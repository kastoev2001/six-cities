import { HousingType } from './housing-type.const.js';
import { OfferImages } from "./offer-images.type.js";

export type Offer = {
    title: string;
    description: string;
    date: Date;
    city: string;
    previewImage: string;
    offerImages: OfferImages;
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    housingType:  typeof HousingType;
    rootsCount: number;
    guestsCount: number;
    price: number;
    facilities: string[];
    avatar: string;
    comments: number;
    coordinates: [string, string];


}