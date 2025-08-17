import compile from '../compile/index.js'
import path from 'path'
export default (folderPath) => {
  let completePath

  if (path.isAbsolute(folderPath)) {
    completePath = folderPath
  } else {
    completePath = path.resolve(folderPath)
  }
  compile({ packPath: completePath })
}
