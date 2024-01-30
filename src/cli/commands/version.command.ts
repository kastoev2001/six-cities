import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Command } from './command.const.js';
import { ICommand } from './command.interface.js';

type PackageJsonConfig = {
    version: string;
}

const isPackageJSONConfig = (value: unknown): value is PackageJsonConfig => {
    const isKeyVersion: boolean = (
        typeof value === 'object' &&
        value !== null
        && !Array.isArray(value)
        && Object.hasOwn(value, 'version')
    );
    return isKeyVersion;
}

export class VersionCommand implements ICommand {
    constructor(
        private readonly filePath: string = './package.json'
    ) {}

    public getName = (): string => {
        return Command.Version;
    }

    public execute = async (..._parameters: string[]): Promise<void> => {
        try {
            const version = this.readVersion();
            console.info(version);
        } catch (err: unknown) {
            console.error(`Failed to read version from ${this.filePath}`);

            if (err instanceof Error) {
                console.error(err.message);
            }
        }
    }

    private readVersion = (): string => {
        const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
        const parsedJsonContent: unknown = JSON.parse(jsonContent);

        const isValidJSONContent = isPackageJSONConfig(parsedJsonContent);

        if (!isValidJSONContent) {
            throw new Error('Failed to parese json content.');
        }

        return parsedJsonContent.version;
    }
}
