import fs from 'fs-extra'
import compile from '../compile/index.js'
import path from 'path'
import console from '../utils/console/index.js'
import verifyReadConfig from '../utils/verifyReadConfig.js'
import manifestGen from '../gen/manifest.js'

let name

async function toBuild(manifest, folder) {
  const src = path.join(process.cwd(), folder)
  if (!fs.pathExistsSync(src)) {
    console.error(`The ${folder} folder does not exist.`)
  }
  await compile({
    packPath: src,
    json: manifest,
    name
  })
}

export default async () => {
  const config = verifyReadConfig()
  const manifest = manifestGen(config)
  name = config.project.name

  if (manifest.behavior) {
    await toBuild(manifest.behavior, 'behavior')
  }
  if (manifest.resource) {
    await toBuild(manifest.resource, 'resource')
  }
}
