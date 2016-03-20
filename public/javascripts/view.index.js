$(function () {
    var user = '';

    $('#left-column').hide();

    $('#right-column').hide();

    $('li.channel-name a').click(function () {

        var name = $(this).text();

        $('#right-column h2').text(name);

        $('#messages li').remove();

        $.getJSON('/channel/' + name, function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] != '') {
                    $('<li>').appendTo('#messages').text(data[i]);
                }
            }
        });

        $('#right-column').show();

        return false;
    });

    $(document).ready(function () {
        $('input[type="submit"]').prop('disabled', true);
        $('input[type="text"]').keyup(function () {
            if ($(this).val() != '') {
                $('input[type="submit"]').prop('disabled', false);
            }
        });
    });

    $('#add-login').click(function () {
        user = $('#add-nick').val();
        $('#nick-column').hide();
        $('<li>').appendTo('h3').text(user);
        $('#left-column').show();
        $.ajax({
            type: "POST",
            url: "/channel/login",
            data: JSON.stringify({
                nick: user
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {}
        });
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
                if (message != '') {
                    var user = $('#add-nick').val();
                    $('<li>').appendTo('#messages').text(data.message);
                    $('#new-message').val('');
                }
            },
            error: function (err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                console.log(msg);
            }
        });
        return false;
    });
    /* setInterval(function () {
     $.ajax({
         type: "POST",
         url: "/channel/refresh",
         success: function (data) {
             for (var i = 0; i < data.messages.length; i++) {
                 if (data.messages[i] != '') {
                     $('<li>').appendTo('#messages').text(data.messages[i]);
                 }
             }
         }
     });
 }, 3000);*/
});
