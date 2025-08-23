import 'colors'
import faces from '../../../json/faces.json' with { type: 'json' }

function random() {
  const keys = Object.keys(faces)
  const random = Math.floor(Math.random() * keys.length)
  const face = faces[keys[random]]
  const index = Math.floor(Math.random() * face.length)
  return face[index]
}

export default (message) => {
  console.log(random().bold, message.bold)
}
