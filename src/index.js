import { Command } from 'commander'
import packAge from '../package.json' assert { type: 'json' }
import pack from './commands/pack.js'
import create from './commands/create/index.js'
import build from './commands/build.js'
import config from './commands/config/index.js'
import watch from './commands/watch/index.js'
const program = new Command()
const version = packAge.version
const description = packAge.description
program.version(version).description(description)
program
  .command('config')
  .description('Edit the configuration file')
  .option('--com.mojang <path>', 'Path of the mojang folder', null)
  .option('--info', 'Show configuration info')
  .option('--clear', 'Clear the configuration')
  .action((options, cmd) => {
    if (options.info) {
      config.info()
      return
    } else if (options.clear) {
      config.clear()
      return
    }
    if (null === options['com.mojang']) {
      cmd.outputHelp()
      return
    }
    config.comMojang(options['com.mojang'])
  })
program
  .command('create')
  .description('Create a new project')
  .action(() => {
    create()
  })
program
  .command('build')
  .description('Package your project')
  .action(() => {
    build()
  })
program
  .command('watch')
  .description('Every time there are changes, pack your project for testing.')
  .action(() => {
    watch()
  })

program
  .command('pack')
  .description('Pack your resource or behavior pack without being a bedcli project.')
  .option('--path <path>', 'Path of your project folder can be relative as obsolete', './')
  .action((options) => {
    pack(options.path)
  })
program.parse(process.argv)
