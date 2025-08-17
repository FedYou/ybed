export default (manifest) => {
  const types = new Set(manifest.modules.map((e) => e.type))

  if ((types.has('data') && types.has('script')) || (types.has('data_client') && types.has('script'))) {
    return 'data:script'
  } else if (types.has('data') || types.has('data_client')) {
    return 'data'
  } else if (types.has('resources')) {
    return 'resources'
  } else if (types.has('script')) {
    return 'script'
  } else if (types.has('skin_pack')) {
    return 'skin'
  }
}
