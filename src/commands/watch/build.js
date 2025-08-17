import fs from 'fs-extra'
import { join } from 'path'
import youfile from 'youfile'
import manifestGen from '../../gen/manifest.js'
import dataToCompile from '../../utils/manifest/dataToCompile.js'
import esbuild from '../../utils/esbuild.js'
import removeDuplicates from './removeDuplicates.js'
import { MANIFEST_TYPES } from '../../enum.js'

function copyFile(file, output) {
  youfile.copy(file, output)
}

export default ({ config, mojang, folders }) => {
  const manifest = manifestGen(config)
  const _manifest = 'manifest.json'
  const fileList = []

  for (const folder of folders) {
    let folderDev
    let folderOuput
    if (folder === 'behavior') {
      folderDev = join(mojang, 'development_behavior_packs')
      folderOuput = join(folderDev, config.project.name)
      const DATA = dataToCompile(manifest.behavior)
      manifest.behavior = DATA.typeScript.manifest
      if (DATA.type === MANIFEST_TYPES.DATA_SCRIPT) {
        esbuild(join('behavior', config.scripts.entry), join(folderOuput, 'scripts/main.js'))
      }
    } else if (folder === 'resource') {
      folderDev = join(mojang, 'development_resource_packs')
      folderOuput = join(folderDev, config.project.name)
    }
    if (fs.pathExistsSync(folderOuput)) {
      youfile.remove(folderOuput)
    }
    removeDuplicates(folderDev, manifest[folder].header.uuid)
    youfile.write.json(join(folderOuput, _manifest), manifest[folder])

    youfile.read.dir.getAllFiles(folder).forEach((file) => {
      const filePathRelative = file.replace(folder, '')
      const output = join(folderOuput, filePathRelative)

      fileList.push({
        file,
        output
      })
    })
  }

  const filteredList = fileList.filter((e) => !e.file.startsWith('behavior/scripts'))

  for (let x = 0; x < filteredList.length; x++) {
    copyFile(filteredList[x].file, filteredList[x].output)
  }
}
