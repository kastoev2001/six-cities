import { Container } from 'inversify';
import { Component } from '../shared/types/index.js';
import { PinoLogger, Logger } from '../shared/libs/logger/index.js';
import { RestApplication } from './rest.application.js';
import { Config, RestSchema, RestConfig } from '../shared/config/index.js';
import  { DatabaseClient, MongoseDatabaseClient } from '../shared/libs/database-client/index.js';

export const createRestApplicationContainer = () => {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.RestConfig).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoseDatabaseClient).inSingletonScope();

  return restApplicationContainer;
};
