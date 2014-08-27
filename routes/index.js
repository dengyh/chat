var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.cookies) {
        if (req.cookies.user_id) {
            User.findById(req.cookies.user_id, function(userErr, user) {
                Message.find({}).sort('time').exec(function(messageErr, messages) {
                    if (userErr || messageErr) {
                        res.render('index', { visited: false });
                    }
                    formatTime = []
                    names = []
                    for (var i = 0; i < messages.length; i++) {
                        formatTime[i] = getFormatTime(messages[i].time);
                    }
                    res.render('index', { visited: true, user: user,
                        messages: messages, formatTime: formatTime });
                });
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