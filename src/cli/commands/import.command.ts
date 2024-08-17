import { ICommand } from './command.interface.js';
import { Command } from './command.const.js';

import { DEFAULT_USER_PASSWORD, DEFAULT_DB_PORT } from './command.const.js';

import { Offer } from '../../shared/types/index.js';

import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { DefaultUserService, UserService, UserModel } from '../../shared/modules/user/index.js';
import { DefaultOfferService, OfferService, OfferModel } from '../../shared/modules/offer/index.js';
import { MongoseDatabaseClient, DatabaseClient } from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';

import { getMongoURI } from '../../shared/helpers/index.js';

export class ImportCommand implements ICommand {
  private userService: UserService;
  private offerService: OfferService;
  private logger: Logger;
  private databaseClient: DatabaseClient;
  private salt!: string;

  constructor() {
    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoseDatabaseClient(this.logger);
  }

  public getName = (): string => Command.Import;

  private saveOffer = async (offer: Offer) => {
    const user = await this.userService.createOrFindByEmail({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD,
    }, this.salt);

    await this.offerService.create({
      city: offer.city,
      commentsCount: offer.commentsCount,
      coordinates: offer.coordinates,
      description: offer.description,
      facilities: offer.facilities,
      guestsCount: offer.guestsCount,
      housingType: offer.housingType,
      isFavorite: offer.isFavorite,
      isPremium: offer.isPremium,
      offerImages: offer.offerImages,
      postDate: offer.postDate,
      previewImage: offer.previewImage,
      price: offer.price,
      rating: offer.rating,
      rootsCount: offer.rootsCount,
      title: offer.title,
      userId: user.id,
    });
  };

  public execute = async (
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> => {

    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err: unknown) {
      console.error(`Con't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  };

  private onImportedLine = async (line: string, resolve: () => void) => {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  };

  private onCompleteImport = (count: number) => {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  };
}

