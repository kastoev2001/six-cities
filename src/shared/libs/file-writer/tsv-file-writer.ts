import { WriteStream, createWriteStream } from 'node:fs';
import { IFileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements IFileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public write = (row: string) => {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => this.stream.once('drain', () => resolve(true)));
    }

    return Promise.resolve();
  };
}
