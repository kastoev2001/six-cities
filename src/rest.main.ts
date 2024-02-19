import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';

import { PinoLogger, Logger } from './shared/libs/logger/index.js';

async function bootstrap() {
    const container = new Container();
    container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
}

await bootstrap();