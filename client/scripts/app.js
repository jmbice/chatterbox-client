// YOUR CODE HERE:
var app = {};

app.init = function () {


};

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
    


  });

app.clearMessages = function () {

  };


app.renderMessage = function () {

  };


app.renderRoom = function () {

  };

 
};