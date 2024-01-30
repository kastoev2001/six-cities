import { readFileSync } from 'node:fs';
import { HousingType, UserType } from '../types/index.js';

import { IFileReader } from './file-reader.interface.js';
import { Offer } from '../types/index.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filePath: string
  ) { }

  public read = (): void => {
    this.rawData = readFileSync(this.filePath, 'utf-8');
  };

  public toArray = (): Offer[] => {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    const offers: Offer[] = this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, previewImage, offerImages, isPremium, isFavorite, rating, housingType, rootsCount, guestsCount, price, facilities, commentsCount, coordinates, username, avatar, email, type]) => ({
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
      }));

    return offers;
  };
}
