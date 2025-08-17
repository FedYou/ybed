import Conf from 'conf'
import chokidar from 'chokidar'
import console from '../../utils/console/index.js'
import verifyReadConfig from '../../utils/verifyReadConfig.js'
import verifyFolders from './verifyFolders.js'
import build from './build.js'
import getTime from '../../utils/getTime.js'
import onWatch from './onWatch.js'

const configGlobal = new Conf({ projectName: 'bedcli' })
const mojang = configGlobal.get('com.mojang')

export default () => {
  if (!mojang) {
    console.error('The com.mojang path is not defined.')
  }
  const config = verifyReadConfig()
  const folders = verifyFolders(config)
  const wacthOptions = {
    ignoreInitial: true
  }

  const time = getTime()
  console.log('~Starting watch...'.yellow.dim.bold)

  build({ config, mojang, folders })
  console.log('~Watch successfully started in'.green.dim.bold, time.end().dim.italic)

  const watch = chokidar.watch(folders, wacthOptions)

  watch.on('all', (event, path) => onWatch({ folders, event, path, mojang, config }))
}
