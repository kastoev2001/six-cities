import { mockServerData } from '../../types/mock-server-data.type.js';
import { IOfferGenerate } from './offer-generate.inerface.js';
import { getRandomItem, getRandomItems, generateRandomValue, getRandomBoolean } from '../../helpers/index.js';
import { HousingType, UserType } from '../../types/housing-type.const.js';

import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MAX_RATING = 5;
const MAX_GUESTS_COUNT = 3;
const MAX_ROOT_COUNT = 4;
const MIN_PRICE = 500;
const MAX_PRICE = 2000;
const MAX_COMMENTS_COUNT = 100;

export class TSVOfferGenerate implements IOfferGenerate {
  constructor(
    private readonly mockData: mockServerData
  ) {}

  public generate = (): string => {
    const housingTypeValues = Object.values(HousingType);
    const userTypes = Object.values(UserType);

    const title = getRandomItem(this.mockData.titles);
    const facilities = getRandomItems(this.mockData.facilities).join(';');
    const description = getRandomItem(this.mockData.descriptions);
    const avatar = getRandomItem(this.mockData.avatars);
    const city = getRandomItem(this.mockData.cities);
    const postDate = TSVOfferGenerate.getRandomDate();
    const previewImage = getRandomItem(this.mockData.images);
    const offerImages = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean() ? 'yes' : 'no';
    const isFavorite = getRandomBoolean() ? 'yes' : 'no';
    const rating = TSVOfferGenerate.getRanodemRating();
    const housingType = getRandomItem(housingTypeValues);
    const rootsCount = TSVOfferGenerate.getRandomRootsCount();
    const guestsCount = TSVOfferGenerate.getRandomGuestsCount();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const commentsCount = generateRandomValue(0, MAX_COMMENTS_COUNT);
    const coordinate = getRandomItem(this.mockData.coordinates).join(';');
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const userType = getRandomItem(userTypes);

    return [
      title, description, postDate, city, previewImage,
      offerImages, isPremium, isFavorite, rating, housingType,
      rootsCount, guestsCount, price, facilities, commentsCount,
      coordinate, username, avatar, email, userType

    ].join('\t');
  };

  static getRandomDate = () => {
    const randomValue = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    return dayjs().subtract(randomValue).toISOString();
  };

  static getRanodemRating = () => Math.round(Math.random() * MAX_RATING);

  static getRandomRootsCount = () => Math.ceil(Math.random() * MAX_ROOT_COUNT);

  static getRandomGuestsCount = () => Math.ceil(Math.random() * MAX_GUESTS_COUNT);
}
