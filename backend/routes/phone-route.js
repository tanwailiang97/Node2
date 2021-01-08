const express = require ('express');
const router = express.Router();
const Attendance = require('../models/attendance-models');
const User = require('../models/user-models');

router.post('/add/:location',async (req, res, next) => {
    if(req.body.token != process.env.ANDROID_KEY){ 
      res.json('Token required'); 
      return;
    }
    try{
      const username = req.body.username;
      const coordinate = req.body.coordinate;
      const location = req.params.location;
      console.log(coordinate);
      const date = new Date();
      const attendance = new Attendance({
        username,
        location,
        coordinate,
        date
      });
      console.log(`${username} attendance at ${location} during ${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`);
      await attendance.save()
      res.json("Attendance Added")
    } catch (error) {
      res.json("Error: " + error)
    }
});

router.post('/login', async (req, res, next) => {
  if(req.body.token != process.env.ANDROID_KEY){ 
    res.json('Token required'); 
    return;
  }
  try{
    const result = req.body;
    const user = await User.findOne({ username: result.username })
    if (!user) throw res.json('User not registered');
    const isMatch = await user.isValidPassword(result.password)
    if (user.password == req.body.password)
          throw res.json('Username/password not valid');
    const userAttendance = await Attendance.find({username: result.username});
    res.json(userAttendance);
  } catch (error) {
    res.json('Error ' + error );
  }
});

module.exports = router;