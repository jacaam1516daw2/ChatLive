var _ = require('underscore');

//channels.push({name: "Canal", messages: "", lastMessages: ""});
var channels = [{
    name: 'Motos',
    messages: [''],
    lastMessages: ''
}, {
    name: 'Coches',
    messages: [''],
    lastMessages: ''
}, {
    name: 'Moviles',
    messages: [''],
    lastMessages: ''
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
    //var fecha = fecha();
    channel.messages.push(req.body.message);
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

function pad(s) {
    return (s < 10) ? '0' + s : s;
}

function fecha() {
    return [pad(new Date().getDate()), pad(new Date().getMonth() + 1), new Date().getFullYear()].join('/') + ' - ' + [pad(new Date().getHours()), pad(new Date().getMinutes())].join(':');
}
