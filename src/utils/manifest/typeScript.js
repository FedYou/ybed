function newManifest(manifest) {
  const index = manifest.modules.findIndex((e) => e.type === 'script')
  manifest.modules[index].entry = 'scripts/main.js'
  manifest.modules[index].language = 'javascript'
  return manifest
}

export default (manifest) => {
  const module = manifest.modules.find((e) => e.type === 'script')
  if (!module) return { manifest }
  return {
    entry: module.entry,
    language: module.language,
    manifest: newManifest(manifest)
  }
}
