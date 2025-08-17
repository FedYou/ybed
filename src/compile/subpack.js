import fs from 'fs-extra'
import { join } from 'path'
import getFiles from './getFiles.js'
import copyFiles from './copyFiles.js'

export default async ({ entry, output, manifest, path, onProgress }) => {
  const existingFolders = manifest.subpacks
    .map(({ folder_name }) => {
      return {
        path: join(entry, folder_name),
        output: join(output, folder_name)
      }
    })
    .filter((folder) => fs.pathExistsSync(folder.path))
  const allFiles = { png: [], files: [] }

  for (const subpack of existingFolders) {
    const list = getFiles({
      packPath: subpack.path,
      cachePath: subpack.output,
      path
    })
    allFiles.png.push(...list.png)
    allFiles.files.push(...list.files)
  }

  const promises = []

  for (const file of allFiles.files) {
    promises.push(copyFiles(file.path, file.output, onProgress))
  }
  for (const file of allFiles.png) {
    promises.push(copyFiles(file.path, file.output, onProgress))
  }
  await Promise.all(promises)
}
