import { ICommand } from './commands/command.interface.js';
import { Command } from './index.js';

import { CommandParser } from './command-parser.js';

type CommandCollection = Record<string, ICommand>

export class CLIApplication {
    private commands: CommandCollection = {};

    constructor(
        private defaultCommand = Command.Help
    ) {}

    public registerCommands = (commandList: ICommand[]): void | never => {
        commandList.forEach((command) => {
            const commandName = command.getName();
            const isRegistedCommand = Object.hasOwn(this.commands, commandName);
            if (isRegistedCommand) {
                throw new Error(`Command ${command.getName} is alread registed`);
            }

            this.commands[commandName] = command;
        })
    }

    public getCommand = (commandName: typeof Command[keyof typeof Command]): ICommand => {
        return this.commands[commandName] ?? this.getDefaultCommand();
    }

    public getDefaultCommand = (): ICommand | never => {
        const commandHelp = this.commands[this.defaultCommand];
        const isExistsCommandHelp = Boolean(commandHelp);

        if (!isExistsCommandHelp) {
            throw new Error(`The default command ${this.defaultCommand} is not reqistered.`);
        }

        return commandHelp;
    }

    public processCommand = (argv: string[]): void => {
        const parsedCommand = CommandParser.parser(argv);
        const [commandName] = Object.keys(parsedCommand) as Array<typeof Command[keyof typeof Command]>;
        const command = this.getCommand(commandName);
        const commandArguments = parsedCommand[commandName] ?? [];
        command.execute(...commandArguments);


    }
}