const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  username: { type: String, required: true },
  location: { type: String, required: true },
  coordinate: { type: String, required: true },
  state: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;