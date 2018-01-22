var socket = io();
socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

socket.on("newMessage", function (message) {
    console.log("New message", message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: "Manu & Ashish Chatting live",
        text: $("[name=message]").val()
    }, function (data) {
        console.log("gGot it", data);
    });
});

var locationButton = $("#send-locaition");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
    }, function () {
        alert('Unable to fetch location');
    });
});