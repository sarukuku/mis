const mongoose = require('mongoose')
const schema = mongoose.Schema

const topicSchema = new schema({
  name: { type: String },
  month: { type: String },
  reporter: { type: String },
  notes: { type: Array, default: [] }
})

topicSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Topic', topicSchema)
