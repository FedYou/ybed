import fs from 'fs-extra'
import console from '../utils/console/index.js'
import { join } from 'path'
import youfile from 'youfile'
import { Cache } from 'youcache'
import { MANIFEST_TYPES } from '../enum.js'
import dataToCompile from '../utils/manifest/dataToCompile.js'
import compilePath from '../../json/compile.json' assert { type: 'json' }
import lang from './lang.js'
import copyFiles from './copyFiles.js'
import getFiles from './getFiles.js'
import subpack from './subpack.js'
import compress from '../utils/compress.js'
import getSize from '../utils/getSize.js'
import getTime from '../utils/getTime.js'
import esbuild from '../utils/esbuild.js'

export default async ({ packPath, json = null, name = null }) => {
  const temp = { time: {}, size: {}, getTime: {} }
  const intf = console.interface()
  const cache = new Cache('bedcli')
  const manifestPath = join(packPath, 'manifest.json')
  let DATA

  let manifest
  if (json) {
    manifest = json
    DATA = dataToCompile(manifest)
    youfile.write.json(join(cache.path, 'manifest.json'), DATA.typeScript.manifest)
  } else {
    if (!fs.pathExistsSync(manifestPath)) {
      console.error('The manifest.json file does not exist.')
    }
    manifest = youfile.read.json(manifestPath)
    DATA = dataToCompile(manifest)
  }
  const onProgress = (path) => {
    let message = `${'\r~Processing file '.bold} ${
      path.replace(packPath, '').replace('/', '').dim.italic
    }`
    intf.text(message)
  }
  temp.size['pack'] = await getSize(packPath)
  DATA.name = name ?? DATA.name
  intf.face(`Starting compilation`.yellow.bold)

  intf.message('~Pack'.bold.dim)

  intf.message(' |>Name:'.bold, DATA.name.dim)
  intf.message(' |>Version:'.bold, DATA.version.dim)
  intf.message(' |>Type:'.bold, DATA.type.dim)
  let PATH

  switch (DATA.type) {
    case MANIFEST_TYPES.RESOURCES:
      PATH = compilePath.resource
      break
    case MANIFEST_TYPES.DATA:
    case MANIFEST_TYPES.DATA_SCRIPT:
      PATH = compilePath.behavior
      break
    case MANIFEST_TYPES.SCRIPT:
      PATH = compilePath.behavior
      break
    case MANIFEST_TYPES.SKIN:
      PATH = compilePath.resource
      break
  }
  temp.getTime['compilation'] = getTime()
  const filesList = getFiles({ packPath, cachePath: cache.path, path: PATH })

  const promises = []

  for (const file of filesList.files) {
    promises.push(copyFiles(file.path, file.output, onProgress))
  }

  for (const file of filesList.png) {
    promises.push(copyFiles(file.path, file.output, onProgress))
  }

  if (fs.pathExistsSync(join(packPath, 'subpacks')) && manifest.subpacks?.length > 0) {
    promises.push(
      subpack({
        entry: join(packPath, 'subpacks'),
        output: join(cache.path, 'subpacks'),
        manifest,
        path: PATH,
        onProgress
      })
    )
  }
  const langPath = join(packPath, 'texts')
  const langCachePath = join(cache.path, 'texts')
  if (fs.pathExistsSync(langPath)) {
    promises.push(lang(langPath, langCachePath))
  }

  if (DATA.type === MANIFEST_TYPES.DATA_SCRIPT) {
    const entry = join(packPath, DATA.typeScript.entry)
    const output = join(cache.path, 'scripts/main.js')
    if (!fs.existsSync(entry)) console.error(`The file "${entry}" does not exist`)

    promises.push(esbuild(entry, output))
  }

  await Promise.all(promises)
  intf.clearLine()
  temp.time['compilation'] = temp.getTime['compilation'].end()
  intf.text('~Compressing files...'.bold)

  temp.getTime['compression'] = getTime()
  youfile.write.dir('dist')
  const zipName = `dist/${DATA.name} V${DATA.version}[${DATA.type}].mcpack`
  compress(cache.path, zipName)
  temp.time['compression'] = temp.getTime['compression'].end()

  temp.size['zip'] = await getSize(zipName)

  intf.clearLine()
  intf.line()
  intf.message('~Size'.bold.dim)
  intf.message(' |>Original'.bold, temp.size['pack'].dim.italic)
  intf.message(' |>Compressed'.bold, temp.size['zip'].dim.italic)
  intf.line()
  intf.message('~Time'.bold.dim)
  intf.message(' |>Compilation:'.bold, temp.time['compilation'].dim)
  intf.message(' |>Compression:'.bold, temp.time['compression'].dim)

  process.stdout.write('\n')

  intf.close()
}
