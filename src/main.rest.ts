import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/config/index.js';
import { DatabaseClient, MongoseDatabaseClient } from './shared/libs/database-client/index.js';

import { PinoLogger, Logger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.RestConfig).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoseDatabaseClient).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);

  application.init();
}

await bootstrap();
