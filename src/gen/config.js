import { v4 as uuid } from 'uuid'
import { PROJECT_TYPES } from '../enum.js'
export default (answers) => {
  const config = {
    project: {
      type: answers.type,
      name: answers.name.trim(),
      description: answers.description.trim(),
      version: [0, 0, 1],
      minEngineVersion: answers.minEngineVersion,
      authors: []
    },
    scripts: '',
    uuid: []
  }
  const PROJECT_TYPE = answers.type
  // Authors

  if (answers.authors.includes(',')) {
    answers.authors.split(',').forEach((author) => {
      config.project.authors.push(author.trim())
    })
  } else {
    config.project.authors.push(answers.authors.trim())
  }

  // Scripts Api

  if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT || PROJECT_TYPE === PROJECT_TYPES.SCRIPT) {
    const scripts = {
      entry: `scripts/main.${answers.language}`,
      language: answers.language,
      dependencies: []
    }

    for (const module in answers.dependencies) {
      scripts.dependencies.push({
        module_name: module,
        version: answers.dependencies[module]
      })
    }
    config.scripts = { ...scripts }
  } else {
    delete config.scripts
  }

  let uuidAmount = 0
  // Uuid Amount for types
  if (
    PROJECT_TYPE === PROJECT_TYPES.SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.RESOURCES ||
    PROJECT_TYPE === PROJECT_TYPES.BEHAVIOR
  ) {
    uuidAmount = 2
  } else if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON) {
    uuidAmount = 4
  } else if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT) {
    uuidAmount = 5
  }

  for (let x = 0; x < uuidAmount; x++) {
    config.uuid.push(uuid())
  }

  return config
}
