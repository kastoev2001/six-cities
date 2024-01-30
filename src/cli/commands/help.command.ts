import { Command } from './command.const.js';
import { ICommand } from './command.interface.js';

import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName = () => Command.Help;

  public execute = async (..._paramenters: string[]): Promise<void> => {
    console.info(`
        Программа для подготовки данных для REST API сервера.  

        Пример: cli.js --<command> [--arguments]
        
        Команды:
        
         ${chalk.underline('--version:')}                   # выводит номер версии
         ${chalk.underline('--help:')}                      # печатает этот текст
         ${chalk.underline('--import <path>:')}             # импортирует данные из TSV
         ${chalk.underline('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных
        `);
  };
}
