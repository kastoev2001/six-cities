import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';

const RETRY_COUNT = 5;
const RETRY_TYMEOUT = 1000;

@injectable()
export class MongoseDatabaseClient implements DatabaseClient {
  private isConnected: boolean;
  private mongoose!: typeof Mongoose;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.isConnected = false;
  }

  public connect = async (uri: string): Promise<void> => {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to monogDB...');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connected established.');
        return;
      } catch (err) {
        attempt++;
        this.logger.error(`Failed to connected to the database. Attempt ${attempt}`, err as Error);
        await setTimeout(RETRY_TYMEOUT);
      }

    }

    throw new Error(`Unable to establish to connection after ${RETRY_COUNT}`);
  };

  public isConnectedToDatabase = (): boolean => this.isConnected;

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
