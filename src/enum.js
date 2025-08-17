const PROJECT_TYPES = {
  ADD_ON_SCRIPT: 'add-on:script',
  ADD_ON: 'add-on',
  RESOURCES: 'resources',
  SCRIPT: 'script',
  DATA: 'data'
}
const MANIFEST_TYPES = {
  DATA_SCRIPT: 'data:script',
  DATA: 'data',
  RESOURCES: 'resources',
  SCRIPT: 'script',
  SKIN: 'skin'
}
const EVENTS = {
  ADD: 'add',
  ADD_DIR: 'addDir',
  REMOVE: 'unlink',
  REMOVE_DIR: 'unlinkDir',
  CHANGE: 'change'
}
const EVENTS_NAME = {
  add: 'ADD',
  addDir: 'ADD_DIR',
  unlink: 'REMOVE',
  unlinkDir: 'REMOVE_DIR',
  change: 'CHANGE'
}
const DEPENDECIES = ['@minecraft/server', '@minecraft/server-ui']
export { MANIFEST_TYPES, PROJECT_TYPES, EVENTS, EVENTS_NAME, DEPENDECIES }
