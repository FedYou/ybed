import enquirer from 'enquirer'
export default async ({
  message,
  validate = () => true,
  retry = false,
  retryMassage = 'Please enter a value.'
}) => {
  if (retry) {
    validate = (value) => {
      if (value.length === 0 || value === null || value === undefined || value === '') {
        return retryMassage
      }
      return true
    }
  }
  const prompt = await enquirer.prompt({
    type: 'input',
    prefix: '~$'.blue,
    name: 'value',
    validate,
    message
  })
  return prompt.value
}
