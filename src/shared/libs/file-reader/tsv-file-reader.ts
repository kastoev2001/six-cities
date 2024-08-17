import { EventEmitter } from 'node:events';
import { createReadStream } from 'node:fs';

import { IFileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16;

export class TSVFileReader extends EventEmitter implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public read = async (): Promise<void> => {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const compileRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', compileRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  };
}
