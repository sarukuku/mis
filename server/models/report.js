const mongoose = require('mongoose');
const schema = mongoose.Schema;

const report = new schema({
  name: { type: String },
  reporter: { type: String },
  months: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Month'
    }
  ]
});

module.exports = mongoose.model('report', report);
