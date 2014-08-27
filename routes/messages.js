var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router
    .post('/', function(req, res) {
        var message = new Message();
        message.from = req.body.user_id;
        message.content = req.body.content;
        message.time = Date.now();

        message.save(function(err) {
            if (err) {
                res.json({ success: false });
            }
            res.json({
                success: true,
                content: message.content,
                time: message.time
            });
        })
    });

module.exports = router;