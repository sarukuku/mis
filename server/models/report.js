const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reportSchema = new schema({
  name: { type: String },
  reporter: { type: String },
  months: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Month'
    }
  ]
});

reportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('report', reportSchema);
