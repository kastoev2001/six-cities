import { Command } from './index.js';

type ParsedCommand = Partial<Record<typeof Command[keyof typeof Command], string[]>>;

export class CommandParser {
    public static parser = (cliArguments: string[]): ParsedCommand  => {
        const parsedCommand: ParsedCommand = {};
        let currentCommand: typeof Command[keyof typeof Command] | null = null;

        for (const argument of cliArguments) {
            const isSubTeam = this.isExictsSubTeam(argument);
            if (isSubTeam) {
                parsedCommand[argument] = [];
                currentCommand = argument;
            } else if (currentCommand && argument) {
                (parsedCommand[currentCommand] as string[]).push(argument);
            }
        }

        return parsedCommand;
    }

    private static isExictsSubTeam = (subTeam: string): subTeam is typeof Command[keyof typeof Command] => Object.values(Command).some((key) => key === subTeam);
}