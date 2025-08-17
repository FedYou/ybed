import Conf from 'conf'
import console from '../../utils/console/index.js'
export default () => {
  const config = new Conf({ projectName: 'bedcli' })
  const mojang = config.get('com.mojang')
  console.log('~Configuration info:'.dim.bold)
  console.log(' |> com.mojang path:'.dim.bold, (mojang ?? 'null').dim.italic)
}
