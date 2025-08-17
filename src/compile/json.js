import youfile from 'youfile'

export default async (entry, output) => {
  const json = youfile.read.json5(entry)
  youfile.write.json(output, json)
}
