import { injectable, inject } from 'inversify';
import express, { Express } from 'express';

import { Component } from '../shared/types/index.js';

import { Logger } from '../shared/libs/logger/logger.interface.js';
import { RestConfig } from '../shared/config/rest.config.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';

import { getMongoURI } from '../shared/helpers/index.js';
import { Controller } from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RestConfig) private readonly config: RestConfig,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.CommentController) private readonly commentController: Controller,
  ) {
    this.server = express();
  }

  private _initDB = async (): Promise<void> => {
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(uri);
  };

  private _initServer = () => {
    const port = this.config.get('PORT');

    this.server.listen(port);
  }

  private _initControllers = () => {
    this.server.use('/comments', this.commentController.router);
  }

  public init = async (): Promise<void> => {
    this.logger.info('Application initialization.');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init Database...');
    await this._initDB();
    this.logger.info('init Database completed.');

    this.logger.info('Try to init Controllers...');
    this._initControllers();
    this.logger.info('Controller initialization completed.');

    this.logger.info('Try to init Server...');
    this._initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  };
}
