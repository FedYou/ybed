import { PROJECT_TYPES } from '../enum.js'

function addScriptDependencies(target, dependencies) {
  dependencies.forEach((e) => target.push(e))
}

export default (config) => {
  const manifest = {}
  const MANIFEST = {
    format_version: 2
  }

  const HEADER = {
    description: 'pack.description',
    name: 'pack.name',
    min_engine_version: config.project.minEngineVersion,
    version: config.project.version
  }

  const PROJECT_TYPE = config.project.type
  const version = config.project.version

  if (
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.DATA
  ) {
    manifest.behavior = { ...MANIFEST }
    manifest.behavior.header = { ...HEADER }
    manifest.behavior.metadata = { authors: config.project.authors }
    manifest.behavior.modules = []
    manifest.behavior.dependencies = []
  }

  if (
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.RESOURCES
  ) {
    manifest.resource = { ...MANIFEST }
    manifest.resource.header = { ...HEADER }
    manifest.resource.metadata = { authors: config.project.authors }
    manifest.resource.modules = []
    manifest.resource.dependencies = []
  }

  //
  // Modules are added for the manifest type
  //

  // Module Resource
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.RESOURCES
  ) {
    manifest.resource.modules.push({
      type: 'resources',
      version
    })
  }

  // Module Behavior
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.DATA
  ) {
    manifest.behavior.modules.push({
      type: 'data',
      version
    })
  }

  // Module Script
  if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT || PROJECT_TYPE === PROJECT_TYPES.SCRIPT) {
    manifest.behavior.modules.push({
      type: 'script',
      language: config.scripts.language,
      entry: config.scripts.entry,
      version
    })
  }

  //
  // Data is added for the type of manifest.
  //

  // >>Add the necessary data to create a manfest for add-on<<
  if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON || PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT) {
    manifest.resource.header.uuid = config.uuid[0]
    manifest.resource.modules[0].uuid = config.uuid[1]
    manifest.behavior.header.uuid = config.uuid[2]
    manifest.behavior.modules[0].uuid = config.uuid[3]

    // Dependecie Resource
    manifest.resource.dependencies.push({
      uuid: config.uuid[2],
      version
    })

    // Dependecie Behavior

    manifest.behavior.dependencies.push({
      uuid: config.uuid[0],
      version
    })
  }
  // >>Add the necessary data to create a manfest for script add-on<<
  if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT) {
    manifest.behavior.modules[1].uuid = config.uuid[4]
  }
  // >>Add the necessary data to create a manfest for resource<<
  if (PROJECT_TYPE === PROJECT_TYPES.RESOURCES) {
    manifest.resource.header.uuid = config.uuid[0]
    manifest.resource.modules[0].uuid = config.uuid[1]
  }
  // >>Add the necessary data to create a manfest for behavior or script<<
  if (PROJECT_TYPE === PROJECT_TYPES.DATA || PROJECT_TYPE === PROJECT_TYPES.SCRIPT) {
    manifest.behavior.header.uuid = config.uuid[0]
    manifest.behavior.modules[0].uuid = config.uuid[1]
  }
  if (PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT || PROJECT_TYPE === PROJECT_TYPES.SCRIPT) {
    addScriptDependencies(manifest.behavior.dependencies, config.scripts.dependencies)
  }
  return manifest
}
