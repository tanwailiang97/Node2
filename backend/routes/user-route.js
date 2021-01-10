const express = require ('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt-helper')
const UserController = require('../controllers/user-controller');


router.get('/all',(req, res, next) => {
    res.send("Home pages: Add Anything You like");
    return;
});

router.get('/user', verifyAccessToken, UserController.user);

router.get('/mod', UserController.moderator);

router.get('/admin', UserController.admin);




module.exports = router;