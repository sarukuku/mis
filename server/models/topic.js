const mongoose = require('mongoose');
const schema = mongoose.Schema;

const topicSchema = new schema({
  name: { type: String },
  notes: { type: Array, default: [] }
});

module.exports = mongoose.model('Topic', topicSchema);
