import fs from 'fs-extra'
import { join, dirname } from 'path'
import youfile from 'youfile'

function read(path, uuid) {
  const manifest = youfile.read.json5(path)
  if (manifest.header.uuid === uuid) {
    youfile.remove(dirname(path))
    return true
  }
}

export default async (path, uuid) => {
  const manifests = []
  fs.readdirSync(path).map((folder) => {
    if (fs.statSync(join(path, folder)).isDirectory()) {
      const manifest = join(path, folder, 'manifest.json')
      if (fs.pathExistsSync(manifest)) {
        manifests.push(manifest)
      }
    }
  })
  for (const manifest of manifests) {
    if (read(manifest, uuid)) {
      console.log('~~'.bold.dim, 'REMOVE DUPLICATED'.red.bold, dirname(manifest).dim.italic)
    }
  }
}
