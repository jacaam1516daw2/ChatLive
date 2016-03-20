var _ = require('underscore');
var moment = require('moment');

var channels = [{
    name: 'Motos',
    messages: [],
    users: []
}, {
    name: 'Coches',
    messages: [],
    users: []
}];

var user = [{
    userName: ''
}];

exports.index = function (req, res) {
    console.log('index');
    var names = channels.map(function (p) {
        return p.name;
    });
    res.render('index', {
        channels: names
    })
};

exports.login = function (req, res) {
    console.log('login');
    user.userName = req.body.nick;
    res.json(user);
}

exports.channel = function (req, res) {
    console.log('channel');
    var canal = -1;
    var us = -1;
    var messages = _(channels).detect(function (p) {
        for (var i = 0; i < channels.length; i++) {
            if (channels[i].name == req.params.name) {
                canal = i;
            }
        }
        for (var x = 0; x < channels[canal].users.length; x++) {
            if (channels[canal].users[x] == user.userName) {
                us = x;
            }
        }
        if (us < 0) {
            channels[canal].users.push(user.userName);
        }
        return p.name == req.params.name;
    }).messages;
    res.json(messages);
}

exports.addMessage = function (req, res) {
    console.log('addMessage');
    if (req.body.message != '') {
        var channel = _(channels).detect(function (p) {
            return p.name == req.body.name;
        });
        channel.messages.push(user.userName + ' - ' + moment(Date.now()).format('DD/MM/YYYY - h:mm:ss') + ' - ' + req.body.message);
        res.json({
            status: 'ok',
            message: user.userName + ' - ' + moment(Date.now()).format('DD/MM/YYYY - h:mm:ss') + ' - ' + req.body.message
        });
    }
}

exports.refresh = function (req, res) {
    res.send({
        messages: channels[0].messages,
        lastMessage: channels[0].lastMessage,
        channels: channels
    });
}
