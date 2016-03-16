var _ = require('underscore');

var channels = [{
    name: 'Motos',
    messages: ['']
}, {
    name: 'Coches',
    messages: ['']
}, {
    name: 'Moviles',
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

    channel.messages.push(req.body.message);
    res.json({
        status: 'ok'
    });
}
