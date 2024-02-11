import { Offer } from '../types/index.js';

import { HousingType, UserType } from '../types/housing-type.const.js';

export const createOffer = (offerData: string): Offer => {
  const [
    title, description, createdDate, city,
    previewImage, offerImages, isPremium, isFavorite,
    rating, housingType, rootsCount, guestsCount, price,
    facilities, commentsCount, coordinates, username, avatar,
    email, type
  ] = offerData.replace('\n', '').split('\t');

  const offer: Offer = {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    previewImage,
    offerImages: offerImages.split((';'))
      .map((image) => image),
    isPremium: 'yes' === isPremium,
    isFavorite: 'yes' === isFavorite,
    rating: parseInt(rating, 10),
    housingType: housingType as typeof HousingType[keyof typeof HousingType],
    rootsCount: parseInt(rootsCount, 10),
    guestsCount: parseInt(guestsCount, 10),
    price: parseInt(price, 10),
    facilities: facilities.split(';'),
    commentsCount: parseInt(commentsCount, 10),
    coordinates: coordinates.split(';'),
    user: { username, avatar, email, type: type as typeof UserType[keyof typeof UserType] }
  };

  return offer;
};
