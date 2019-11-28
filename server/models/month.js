const mongoose = require('mongoose');
const schema = mongoose.Schema;

const month = new schema({
  name: { type: String },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    }
  ]
});

module.exports = mongoose.model('month', month);
