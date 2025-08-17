import fs from 'fs-extra'
import console from '../../utils/console/index.js'
import { PROJECT_TYPES } from '../../enum.js'

export default (config) => {
  const PROJECT_TYPE = config.project.type
  const folders = []
  if (
    PROJECT_TYPE === PROJECT_TYPES.DATA ||
    PROJECT_TYPE === PROJECT_TYPES.SCRIPT ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT
  ) {
    if (!fs.existsSync('behavior')) {
      console.error('behavior folder not found.')
    }
    folders.push('behavior')
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.RESOURCES ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON ||
    PROJECT_TYPE === PROJECT_TYPES.ADD_ON_SCRIPT
  ) {
    if (!fs.existsSync('resource')) {
      console.error('resource folder not found.')
    }
    folders.push('resource')
  }
  return folders
}
