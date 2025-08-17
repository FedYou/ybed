import enquirer from 'enquirer'

export default async ({
  message = '',
  choices = [],
  retry = false,
  retryMassage = 'Please select at least one option.'
}) => {
  const prompt = await enquirer.prompt({
    type: 'multiselect',
    name: 'value',
    message,
    choices,
    validate: (value) => {
      if (retry) {
        if (value.length === 0) {
          return retryMassage
        }
      }
      return true
    }
  })
  return prompt.value
}
