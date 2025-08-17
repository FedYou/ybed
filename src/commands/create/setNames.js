import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter.js'

export default ({ template, name, description }) => {
  return template.map((e) => {
    if (typeof e.content === 'string') {
      e.content = e.content.replace(/{{name}}/g, capitalizeFirstLetter(name))
      e.content = e.content.replace(/{{description}}/g, description)
      return e
    }

    if (typeof e.content === 'object' && !Array.isArray(e.content)) {
      for (const key in e.content) {
        if (typeof e.content[key] !== 'string') continue
        e.content[key] = e.content[key].replace(/{{name}}/g, name)
        e.content[key] = e.content[key].replace(/{{description}}/g, description)
      }
    }
    return e
  })
}
