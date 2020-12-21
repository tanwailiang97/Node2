const express = require ('express');
const router = express.Router();

const Attendance = require('../models/attendance-models');
const User = require('../models/user-models');

router.route('/').get((req, res) => {
  Attendance.find()
    .then(attendance => res.json(attendance))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  let username = req.body.username;
  let date = new Date();
  let newAttendance = new Attendance({
    username,
    date
  });
  console.log(`${username} attendance at ${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`);
  newAttendance.save()
  .then(() => res.json('Attendance added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Attendance.findById(req.params.id)
    .then(attendance => res.json(attendance))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/adduser').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let date = new Date();
  let newUser = new User({
    username,
    password,
    date
  });
  console.log(`${username} Added at ${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`);
  newUser.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/:id').delete((req, res) => {
  Attendance.findByIdAndDelete(req.params.id)
    .then(() => res.json('Attendance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Attendance.findById(req.params.id)
    .then(attendance => {
      attendance.username = req.body.username;
      attendance.description = req.body.description;
      attendance.duration = Number(req.body.duration);
      attendance.date = Date.parse(req.body.date);

      attendance.save()
        .then(() => res.json('Attendance updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
*/
module.exports = router;
