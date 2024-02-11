import { ICommand } from './command.interface.js';
import { Command } from './command.const.js';

import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements ICommand {
  public getName = (): string => Command.Import;

  public execute = async (...paramenters: string[]): Promise<void> => {
    const [filename] = paramenters;
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

  private onImportedLine = (line: string) => {
    const offer = createOffer(line);
    console.info(offer);
  };

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }
}
