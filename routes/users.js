var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Message = require('../models/message');

/* GET users listing. */
router
    .post('/', function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.ip = req.connection.remoteAddress;

        user.save(function(err) {
            if (err) {
                res.json({ success: false });
            }
            res.cookie('user_id', user._id);
            res.json({ success: true });
        })
    });

router
    .get('/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
                res.json({ success: false, name: '' });
            }
            res.json({ success: true, name: user.name });
        });
    });

router
    .get('/home/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(userErr, user) {
            Message.find({ from: user }, function(messageErr, messages) {
                if (userErr || messageErr) {
                    res.render('user', {
                        title: 'Error',
                        messages: messages
                    });
                }
                res.render('user', {
                    title: user.name,
                    messages: messages
                });
            });
        });
    });

module.exports = router;
