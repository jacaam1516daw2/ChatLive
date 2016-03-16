$(function () {
    $('#right-column').hide();

    $('li.channel-name a').click(function () {

        var name = $(this).text();

        $('#right-column h2').text(name);

        $('#messages li').remove();

        $.getJSON('/channel/' + name, function (data) {
            for (var i = 0; i < data.length; i++) {
                $('<li>').appendTo('#messages').text(data[i]);
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
                message: message
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('<li>').appendTo('#messages').text(message);
                $('#new-message').val('');
            },
            error: function (err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                alert(msg);
            }

        });
        return false;
        refresh();
    });

    function refresh() {
        $.ajax({
            url: "/channel/add-message",
            data: JSON.stringify({
                name: $('#right-column h2').text(),
                message: $('#new-message').val()
            }),

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('<li>').appendTo('#messages').text(message);
                $('#new-message').val('');
                setInterval(refresh, 500);
            },
            error: function (err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                alert(msg);
            },
        });
    }
});
