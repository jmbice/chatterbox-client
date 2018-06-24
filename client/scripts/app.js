// YOUR CODE HERE:
var app = {};
app.init = function () {
};

app.messagesArray;
app.currentRoom = 'All';
app.rooms = {}; 
app.friends = {};

app.send = function (message) {
    
  var message = {
    username: message.username,
    text: message.text,
    roomname: message.roomname
  };

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function () {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: { order: '-createdAt',  limit: 50 },
    success: function (data) {
      console.log('chatterbox: Message recieved');
      app.messagesArray = data;
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetchByRoom = function (room) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: { order: '-createdAt', where: {"roomname":room} },
    success: function (data) {
      console.log('chatterbox: Message recieved');
      app.messagesArray = data;
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function () {
  $('#chat-log').text('');
};

app.renderMessage = function (message) {
  var text = message.text;
  var roomName = message.roomname;
  var user;
  message.username === '' ? user = "No Name" : user = message.username;
  /*app.friends[user] ? user = user + " friends" : user = user;*/
  if (app.friends[user.replace(/\s/g, '_')]) {
    var appendMe = '<div class="chats"> <div class="'+ user.replace(/\s/g, '_') + ' friend"> Name: ' + user + '</div> <div class="post-text"> Text: ' + text + '</div><div class="room"> Chatroom:' + roomName + '</div></div>';
  } else {
    var appendMe = '<div class="chats"> <div class=' + user.replace(/\s/g, '_') + '> Name: ' + user + '</div> <div class="post-text"> Text: ' + text + '</div><div class="room"> Chatroom:' + roomName + '</div></div>';
  }

  //var appendMe = '<div class="chats"> <div class=' + "" + user + "" + '> Name: ' + user + '</div> <div class="post-text"> Text: ' + text + '</div><div class="room"> Chatroom:' + roomName + '</div></div>';
  $('#chat-log').prepend(appendMe);
  
  $(".chats").on('click', function() {
    var className = $(this).children(0).attr('class');
    app.friends[className] = className;
    $("." +className).toggleClass('friend');
  });
};

app.renderRoom = function (roomName) {
  $('#roomSelect').append('<option class="room" value=' + roomName + '>' + roomName + '</option>');
};

