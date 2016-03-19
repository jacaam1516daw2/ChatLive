var _ = require('underscore');
var moment = require('moment');

var channels = [{
    name: 'Motos',
    messages: ['']
}, {
    name: 'Coches',
    messages: ['']
}];

exports.index = function (req, res) {
    var names = channels.map(function (p) {
        return p.name;
    });
    res.render('index', {
        channels: names
    })
};

exports.channel = function (req, res) {
    var messages = _(channels).detect(function (p) {
        return p.name == req.params.name;
    }).messages;
    res.json(messages);
}

exports.addMessage = function (req, res) {
    var channel = _(channels).detect(function (p) {
        return p.name == req.body.name;
    });
    channel.messages.push(moment(Date.now()).format('DD/MM/YYYY - h:mm:ss') + ' - ' + req.body.message);
    res.json({
        status: 'ok'
    });
}

exports.refresh = function (req, res) {
    if (channels[0].messages.length > 0) {
        res.send({
            message: channels[0].messages[channels[0].messages.length - 1]
        });
    }
}
