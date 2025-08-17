import Conf from 'conf'
export default () => {
  const config = new Conf({ projectName: 'bedcli' })
  config.clear()
  console.log('~Configuration cleared'.dim.bold)
}
