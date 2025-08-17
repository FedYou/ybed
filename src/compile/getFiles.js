import fs from 'fs-extra'
import { join } from 'path'
import youfile from 'youfile'

function byFolders(folders, packPath, cachePath) {
  const png = []
  const files = folders
    .map((folderName) => {
      const folderPath = join(packPath, folderName)
      if (fs.pathExistsSync(folderPath)) {
        const pngPath = youfile.read.dir.getAllExtnameFiles(folderPath, '.png')
        const pngOutput = pngPath.map((path) => join(cachePath, path.replace(packPath, '')))
        const path = youfile.read.dir
          .getAllFiles(folderPath)
          .filter((e) => !e.endsWith('.png'))
          .filter((e) => !e.endsWith('.lang'))

        const output = path.map((path) => join(cachePath, path.replace(packPath, '')))
        png.push({ path: pngPath, output: pngOutput })
        return {
          path,
          output
        }
      }
    })
    .filter(Boolean)
  return { png, files }
}
function byList(files, packPath, cachePath) {
  const path = files
    .map((filePath) => {
      const resPath = join(packPath, filePath)
      if (fs.pathExistsSync(resPath)) return resPath
    })
    .filter(Boolean)

  const output = path.map((path) => {
    return join(cachePath, path.replace(packPath, ''))
  })
  const pngPath = path.filter((e) => e.endsWith('.png'))
  const pngOutput = pngPath.map((path) => join(cachePath, path.replace(packPath, '')))
  return {
    png: [{ path: pngPath, output: pngOutput }],
    files: [{ path, output }]
  }
}

export default ({ packPath, cachePath, path }) => {
  const folders = byFolders(path.folders, packPath, cachePath)
  const files = byList(path.files, packPath, cachePath)

  folders.files.push(...files.files)
  folders.png.push(...files.png)

  return folders
}
