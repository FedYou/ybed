import fs from 'fs-extra'
import getFolderSize from 'get-folder-size'

function format(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024
    index++
  }

  return `${bytes.toFixed(2)}${units[index]}`
}
export default async (path) => {
  let stat = fs.statSync(path)
  if (stat.isDirectory()) {
    stat = await getFolderSize(path)
  }
  return format(stat.size)
}
