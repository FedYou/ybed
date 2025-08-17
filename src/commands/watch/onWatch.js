import console from '../../utils/console/index.js'
import { join } from 'path'
import { EVENTS_NAME, PROJECT_TYPES } from '../../enum.js'
import debouncedCopy from './debouncedCopy.js'
import esbuild from '../../utils/esbuild.js'
import getTime from '../../utils/getTime.js'
export default async ({ folders, event, path, mojang, config }) => {
  let folderOuput
  let name

  if (path.startsWith('behavior/')) {
    folderOuput = join(mojang, 'development_behavior_packs', config.project.name)
    name = 'behavior'
  } else if (path.startsWith('resource/')) {
    folderOuput = join(mojang, 'development_resource_packs', config.project.name)
    name = 'resource'
  }

  const filePathRelative = path.replace(name, '')
  const output = join(folderOuput, filePathRelative)

  const onEnd = (time) => {
    console.log('~~'.bold.dim, EVENTS_NAME[event].red.bold, path.dim.italic, time.dim.italic)
  }

  const isScript =
    config.project.type === PROJECT_TYPES.SCRIPT || config.project.type === PROJECT_TYPES.ADD_ON_SCRIPT
  if (isScript && name === 'behavior' && (path.endsWith('.js') || path.endsWith('.ts'))) {
    const time = getTime()
    await esbuild(join('behavior', config.scripts.entry), join(folderOuput, 'scripts/main.js'))

    console.log('~~'.dim.bold, 'Rebuild in scripts/main.js'.dim.italic, time.end().dim.italic)
  } else debouncedCopy(event, path, output, onEnd)
}
