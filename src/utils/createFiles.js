import fs from 'fs'
import path from 'path'
import youfile from 'youfile'

export default ({ dirPath = '', data = [] }) => {
  for (const obj of data) {
    if (obj.folder) {
      youfile.write.dir(folder)
      continue
    }

    const filePath = path.join(dirPath, obj.path)
    let contentFile

    if (obj.base64) {
      contentFile = Buffer.from(obj.content, 'base64')
    } else {
      if (typeof obj.content === 'object') {
        contentFile = JSON.stringify(obj.content, null, 2)
      } else {
        contentFile = obj.content
      }
    }
    youfile.write.dir(path.dirname(filePath))
    fs.writeFileSync(filePath, contentFile)
  }
}
