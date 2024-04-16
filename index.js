#! /usr/bin/env node
import { program } from 'commander';

import { web } from './commands/web.js';
import { list } from './commands/list.js';

program.command('web').description('run a web server to analyze the project img').action(web)
program.command('list').description('run a web server to analyze the project img').action(list)

program.parse(process.argv);
