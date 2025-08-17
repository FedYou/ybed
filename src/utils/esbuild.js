import esbuild from 'esbuild'
import { DEPENDECIES } from '../enum.js'
export default async (entry, outfile) => {
  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    outfile,
    external: DEPENDECIES,
    format: 'esm'
  })
}
