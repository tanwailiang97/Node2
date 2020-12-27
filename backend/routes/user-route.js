const express = require ('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt-helper')

router.get('/all',(req, res, next) => {
    res.send("All pages");
    return;
});

router.get('/user', verifyAccessToken, async (req, res, next) => {
    res.send("User pages, Access Granted");
    return;
});

router.get('/mod', verifyAccessToken, async (req, res, next) => {
    res.send("Moderator pages, Access Granted");
    return;
});

router.get('/admin', verifyAccessToken, async (req, res, next) => {
    res.send("Admin pages, Access Granted");
    return;
});

module.exports = router;