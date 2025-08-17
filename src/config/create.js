import commands from '../../json/commands.json' assert { type: 'json' }
import messages from '../../json/messages.json' assert { type: 'json' }

const CONFIG = {
  name: {
    message: messages.input.projectName,
    retry: true,
    retryMassage: messages.validate.projectName
  },
  description: {
    message: messages.input.projectDescription
  },
  authors: {
    message: messages.input.author,
    retry: true,
    retryMassage: messages.validate.author
  },
  minEngineVersion: {
    message: messages.input.minEngineVersion,
    choices: commands.create.minEngineVersion
  },
  type: {
    message: messages.input.typeProject,
    choices: commands.create.typeProject
  },
  language: {
    message: messages.input.language,
    choices: commands.create.language
  },
  dependencies: {
    message: messages.input.dependencies,
    choices: commands.create.dependencies,
    retry: true,
    retryMassage: messages.validate.dependencies
  },
  dependencieServer: {
    message: messages.input.dependencieServer,
    choices: commands.create.dependencieServer
  },
  dependencieServerUi: {
    message: messages.input.dependencieServerUi,
    choices: commands.create.dependencieServerUi
  }
}
export default CONFIG
