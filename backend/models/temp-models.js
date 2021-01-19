const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tempSchema = new Schema({
  temperature: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Temperature = mongoose.model('Temperature', tempSchema);

module.exports = Temperature;