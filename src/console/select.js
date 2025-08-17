import enquirer from 'enquirer'
export default async ({ message = '', choices = [] }) => {
  const prompt = await enquirer.prompt({
    type: 'select',
    prefix: '~$'.blue,
    name: 'value',
    message,
    choices
  })
  return prompt.value
}
