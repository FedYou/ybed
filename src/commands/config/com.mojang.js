import fs from 'fs-extra'
import path from 'path'
import Conf from 'conf'
import console from '../../utils/console/index.js'

export default (folderPath) => {
  let completePath

  if (path.isAbsolute(folderPath)) {
    completePath = folderPath
  } else {
    completePath = path.resolve(folderPath)
  }

  if (!fs.pathExistsSync(completePath)) {
    console.error(`The ${completePath} folder does not exist.`)
  }
  const PATH = ['development_behavior_packs', 'development_resource_packs']

  for (const src of PATH) {
    if (!fs.pathExistsSync(path.join(completePath, src))) {
      console.error(`The ${src} folder does not exist. It is not the com.mojang folder`)
    }
  }

  const config = new Conf({ projectName: 'bedcli' })
  config.set('com.mojang', completePath)
}
