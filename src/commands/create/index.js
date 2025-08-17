import CONFIG from '../../config/create.js'
import input from '../../console/input.js'
import select from '../../console/select.js'
import multiSelect from '../../console/multiSelect.js'
import create from './create.js'
async function getDependencies(answers) {
  const NAMES = {
    server: '@minecraft/server',
    serverUi: '@minecraft/server-ui'
  }
  const dependencies = {}

  if (!answers.dependencies) return dependencies

  for (const dependency of answers.dependencies) {
    if (dependency === NAMES.server) {
      dependencies[NAMES.server] = await select(CONFIG.dependencieServer)
    }
    if (dependency === NAMES.serverUi) {
      dependencies[NAMES.serverUi] = await select(CONFIG.dependencieServerUi)
    }
  }
  return dependencies
}

export default async () => {
  const answers = {
    name: await input(CONFIG.name),
    description: await input(CONFIG.description),
    authors: await input(CONFIG.authors),
    minEngineVersion: await select(CONFIG.minEngineVersion),
    type: await select(CONFIG.type)
  }

  if (answers.type === 'add-on:script' || answers.type === 'script') {
    answers.language = await select(CONFIG.language)
    answers.dependencies = await multiSelect(CONFIG.dependencies)
  }

  answers.dependencies = await getDependencies(answers)
  create(answers)
}
