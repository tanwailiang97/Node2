const express = require ('express');
const router = express.Router();

var temperature =27.5;
var username;
var id;

//app.use();

router.get('/',(req, res, next) => {
    res.render('index',{title:"Testing Application"});
//    res.render(express.static(path.join(__dirname,'public')))
    console.log(req.ip);
    return;
});
 
router.get('/home',(req, res, next)=> {
    res.render('home',{title:"Testing Application Home"});
    return;
});

router.get('/Temperatureinput',(req, res, next)=>{
    res.render('temperature',{title:"Enter Temperature"});
});

router.post('/Temperature',(req, res, next)=>{
    temperature = req.body.temperature;
    res.send("Temperature updated");
    console.log("Temperature= " + temperature);
});

router.post('/QrScan',(req, res, next)=>{
    console.log(req.body);
    username = req.body.username;
    id = req.body.id;
    console.log(username + "\n" + id + "\n" + temperature + "\nLogin Succesfully");
    res.send("temperature:" + temperature );
});

router.get('/All',(req, res, next)=>{
    res.send("<p>" + username + "</p><p>" + id + "</p><p>" + temperature + "</p>Login Succesfully");
});




module.exports = router;