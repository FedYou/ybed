import getType from './type.js'
import getTypeScript from './typeScript.js'
export default (manifest) => {
  const type = getType(manifest)
  const name = manifest.header.name
  const version = manifest.header.version.join(',')
  const typeScript = getTypeScript(manifest)
  return {
    type,
    name,
    version,
    typeScript
  }
}
