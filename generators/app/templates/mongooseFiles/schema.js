const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crudExampleSchema = new Schema({
  name: {
    type: String
  },
  details: {
    type: Schema.Types.Map
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = crudExampleSchema;
