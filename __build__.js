import fs from 'fs-extra'
import esbuild from 'esbuild'
import youfile from 'youfile'
import { join } from 'path'

console.log('Building starting...')
if (fs.existsSync('dist')) {
  youfile.remove('dist')
}
const externalFiles = ['README.md', 'LICENCE']
const packAge = youfile.read.json('package.json')

const entryPoints = ['src/index.js']
const buildFile = '.temp/index.js'
const outfile = 'dist/bin/bedcli.js'

if (packAge.scripts) delete packAge.scripts

esbuild.buildSync({
  entryPoints,
  bundle: true,
  minify: true,
  outfile: buildFile,
  packages: 'external',
  format: 'esm',
  target: 'node18',
  platform: 'node'
})

const content = '#!/usr/bin/env node\n' + youfile.read.file(buildFile)
youfile.write.file(outfile, content)
youfile.write.json('dist/package.json', packAge)

for (const file of externalFiles) {
  youfile.copy(file, join('dist', file))
}

youfile.remove('.temp')
console.log('Building finished.')
