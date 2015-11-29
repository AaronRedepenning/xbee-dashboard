var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config.js');

// Express use for serving static files
app.use(express.static('../client/app'));
app.use(express.static('../client'));

// Set up routes
app.get('/', function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

// Socket.io emmitters
io.on('connection', function(socket){
  console.log('a user connected');
});

// Start Server
var server = app.listen(config.server.listenPort, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listenin on: http://%s:%s', host, port);
});
