import { injectable, inject } from 'inversify';

import { Component } from '../shared/types/index.js';

import { Logger } from '../shared/libs/logger/logger.interface.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) { }

  public init = () => {
    this.logger.info('Application initialization.');
  }
}
