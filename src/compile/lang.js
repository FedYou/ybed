import fs from 'fs-extra'
import readline from 'readline'
import youfile from 'youfile'
import { join, basename } from 'path'
function minifyLang(entryFile, ouputFile) {
  const readStream = fs.createReadStream(entryFile, { encoding: 'utf-8' })
  const writeStream = fs.createWriteStream(ouputFile)

  return new Promise((resolve) => {
    const read = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    })

    read.on('line', (line) => {
      const snip = line.trim()
      if (!snip.startsWith('##') && snip.includes('=')) {
        writeStream.write('\n' + snip)
      }
    })

    read.on('close', () => {
      resolve(true)
    })
  })
}

export default (entryFolder, ouputFolder) => {
  youfile.write.dir(ouputFolder)
  const langFiles = youfile.read.dir.getExtnameFiles(entryFolder, '.lang')
  return new Promise((resolve) => {
    langFiles.forEach(async (filePath) => {
      const ouputFile = join(ouputFolder, basename(filePath))
      await minifyLang(filePath, ouputFile)
      resolve()
    })
  })
}
