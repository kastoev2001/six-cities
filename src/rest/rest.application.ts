import { injectable, inject } from 'inversify';

import { Component } from '../shared/types/index.js';

import { Logger } from '../shared/libs/logger/logger.interface.js';
import { RestConfig } from '../shared/config/rest.config.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RestConfig) private readonly config: RestConfig,
  ) { }

  public init = () => {
    this.logger.info('Application initialization.');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  };
}
