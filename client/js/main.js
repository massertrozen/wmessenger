$(function() {
    var socket = io.connect();

    $(".chat-messages-send").submit(function(event) {
        event.preventDefault();

        socket.emit("sendMessage", $(".chat-messages-send-value").val());
        $(".chat-messages-send-value").val("");
    });

    socket.on("displayMessage", function(data) {
        $(".chat-messages-body").append("<div class='chat-message'><span>" + data.author + "</span>" + data.message + "</div>");
        $(".chat-messages-body").scrollTop($(".chat-messages-body")[0].scrollHeight);
        // $("#notification-sound").play();
        
    });

    socket.on("playNotificationSound", function() {
        document.getElementById('notification-sound').play();
    });
});