import { ICommand } from './command.interface.js';
import { Command } from './command.const.js';

import { TSVFileReader } from '../../shared/file-reader/index.js';

export class ImportCommand implements ICommand {
    public  getName = (): string => Command.Import;

    public execute = async (...paramenters: string[]): Promise<void> => {
        const [filename] = paramenters;
        const fileReader = new TSVFileReader(filename.trim());

        try {
            fileReader.read();
            console.info(fileReader.toArray());
        } catch(err: unknown) {
            console.error(`Con't import data from file: ${filename}`);

            if (!(err instanceof Error)) {
                throw err;
            }

            console.error(`Details: ${err.message}`);
        }
    }
}