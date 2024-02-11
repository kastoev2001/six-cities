import got from 'got';

import { ICommand } from './command.interface.js';
import { mockServerData } from '../../shared/types/index.js';

import { Command } from './command.const.js';

import { TSVOfferGenerate } from '../../shared/libs/offer-generate/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class GenerateCommand implements ICommand {
  private initialData: mockServerData | null = null;

  public getName = (): string => Command.Generate;

  public execute = async (...parameters: string[]): Promise<void> => {
    const [count, filepath, url] = parameters;

    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(offerCount, filepath);
      console.info(`File ${filepath} was created!`);
    } catch (err: unknown) {
      console.error('Con\'n not generate data');

      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  private load = async (url: string) => {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can'n not load data from ${url}`);
    }
  };

  private write = async (offerCount: number, filepath: string): Promise<void> => {
    const tsvOfferGenerate = new TSVOfferGenerate(this.initialData as mockServerData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    try {
      for (let i = 0; i < offerCount; i++) {
        const generetedRow = tsvOfferGenerate.generate();
        await tsvFileWriter.write(generetedRow);
      }
    } catch (err: unknown) {
      console.error(`Can't to write to file ${filepath}.`);
      console.error(getErrorMessage(err));
    }
  };
}
