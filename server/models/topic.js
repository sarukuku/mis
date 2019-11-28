const mongoose = require('mongoose');
const schema = mongoose.Schema;

const topic = new schema({
  name: { type: String },
  notes: { type: Array, default: [] }
});

module.exports = mongoose.model('month', month);
