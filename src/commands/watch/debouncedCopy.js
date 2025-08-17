import fs from 'fs-extra'
import youfile from 'youfile'
import debounce from 'lodash/debounce.js'
import getTime from '../../utils/getTime.js'

import { EVENTS } from '../../enum.js'

export default debounce((event, path, output, onEnd) => {
  const time = getTime()
  if (EVENTS.REMOVE === event || EVENTS.REMOVE_DIR === event) {
    if (fs.pathExistsSync(output)) youfile.remove(output)
  } else if (EVENTS.ADD_DIR === event) {
    youfile.write.dir(output)
  } else if (EVENTS.ADD === event || EVENTS.CHANGE === event) {
    if (fs.pathExistsSync(path)) youfile.copy(path, output)
  }
  onEnd(time.end())
}, 100)
