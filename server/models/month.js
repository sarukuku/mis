const mongoose = require('mongoose')
const schema = mongoose.Schema

const monthSchema = new schema({
  name: { type: String },
  date: { type: Date },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    }
  ]
})

monthSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Month', monthSchema)
