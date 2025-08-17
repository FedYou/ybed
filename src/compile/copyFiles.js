import youfile from 'youfile'
import sharp from 'sharp'
import { dirname } from 'path'
import json from './json.js'

async function processFile(path, outputPath, onProgress = () => {}) {
  if (path.endsWith('.json')) {
    await json(path, outputPath)
    onProgress(path)
  } else if (path.endsWith('.png')) {
    youfile.write.dir(dirname(outputPath))
    await sharp(path)
      .png({
        compressionLevel: 9,
        quality: 100
      })
      .toFile(outputPath)
    onProgress(path)
  } else {
    youfile.copy(path, outputPath)
    onProgress(path)
  }
}
export default async (filesPath, filesOutputPath, onProgress) => {
  const promises = []
  for (let x = 0; x < filesPath.length; x++) {
    promises.push(processFile(filesPath[x], filesOutputPath[x], onProgress))
  }
  await Promise.all(promises)
}
