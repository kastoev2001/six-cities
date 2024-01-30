import { HousingType, UserType } from './housing-type.const.js';
import { OfferImages } from "./offer-images.type.js";

type User = {
    username: string;
    email: string;
    avatar: string;
    type: typeof UserType[keyof typeof UserType]
}

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
    user: User

}