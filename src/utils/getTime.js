import { performance } from 'perf_hooks'

function convertTime(ms) {
  if (ms < 1000) {
    return ms.toFixed(2) + 'ms'
  } else if (ms < 1000 * 60) {
    return (ms / 1000).toFixed(2) + 's'
  } else if (ms < 1000 * 60 * 60) {
    return (ms / (1000 * 60)).toFixed(2) + 'm'
  } else {
    return (ms / (1000 * 60 * 60)).toFixed(2) + 'h'
  }
}

export default () => {
  const start = performance.now()
  return {
    end: () => {
      const end = performance.now()
      return convertTime(end - start).replace('.', ',')
    }
  }
}
