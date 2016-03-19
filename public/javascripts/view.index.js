$(function () {

    $('#right-column').hide();

    $('li.channel-name a').click(function () {

        var name = $(this).text();

        $('#right-column h2').text(name);

        $('#messages li').remove();

        $.getJSON('/channel/' + name, function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] != '') {
                    $('<li>').appendTo('#messages').text('li.channel-name a' + data[i]);
                }
            }
        });

        $('#right-column').show();

        return false;
    });

    $('#add-new-message').click(function () {

        var name = $('#right-column h2').text();
        var message = $('#new-message').val();

        $.ajax({
            type: "POST",
            url: "/channel/add-message",
            data: JSON.stringify({
                name: name,
                message: message,
                fecha: 'ADIOS'
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('<li>').appendTo('#messages').text('add-new-message ' + message);
                $('#new-message').val('');
            },
            error: function (err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                console.log(msg);
            }
        });
        return false;
    });

    setInterval(function () {
        $.ajax({
            type: "POST",
            url: "/channel/refresh",
            /*  data: JSON.stringify({
                   name: name,
                   message: message
               }),*/
            success: function (data) {
                if (data.message != '') {
                    $('<li>').appendTo('#messages').text(data.message);
                }
            },
            error: function (err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                console.log(msg);
            }
        });
    }, 4000);

});
