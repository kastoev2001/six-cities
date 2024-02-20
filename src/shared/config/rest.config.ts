import { injectable, inject } from 'inversify'; 
import { Component } from '../types/index.js';

import { Logger } from '../libs/logger/index.js';
import { Config } from './config.inetface.js';
import { RestSchema, configRestSchama } from './rest.schema.js';
import { config } from 'dotenv';

@injectable()
export class RestConfig implements Config<RestSchema> {
    private readonly config: RestSchema;

    constructor(
       @inject(Component.Logger) private readonly logger: Logger,
    ) {
        const paredOutput = config();

        if (paredOutput.error) {
            throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
        }

        configRestSchama.load({});
        configRestSchama.validate({ allowed: 'strict', output: this.logger.info});

        this.config = configRestSchama.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    public get = <T extends keyof RestSchema>(key: T): RestSchema[T] => {
        return this.config[key];
    }
}
