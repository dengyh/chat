var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.cookies) {
        if (req.cookies.user_id) {
            User.findById(req.cookies.user_id, function(userErr, user) {
                if (userErr) {
                    res.render('index', { visited: false });
                }
                res.render('index', { visited: true, user: user });
            });
        } else {
            res.render('index', { visited: false });
        }
    } else {
        res.render('index', { visited: false });
    }
});

module.exports = router;

function getFormatTime(time) {
    var tempTime = new Date(time);
    var result = '';
    result += tempTime.getFullYear() + '-';
    result += (tempTime.getMonth() + 1) + '-';
    result += tempTime.getDate() + ' ';
    result += tempTime.getHours() + ':';
    result += tempTime.getMinutes() + ':';
    result += tempTime.getSeconds();
    return result;
}