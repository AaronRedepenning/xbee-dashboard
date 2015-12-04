var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var config = require('./config.js');

// Express use for serving static files
app.use(express.static('../client/app'));
app.use(express.static('../client'));

// XBee Variables
var C = xbee_api.constants,
    xbee_set = false,
		xbeeAPI,
		serialport;

// New XBee Object with API (Escaping) Mode
xbeeAPI = new xbee_api.XBeeAPI({
	api_mode: 2
});

// Use serial port settings in config file and apply xbee parser
serialport = new SerialPort(config.xbee.serialPort, {
	baudrate: config.xbee.baudrate,
  parser: xbeeAPI.rawParser()
});

// Set up routes
app.get('/', function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

// Socket.io emmitters
io.on('connection', function(socket){
	// Set up event handler for recieveing xbee frames
	if (xbee_set === false) {
			xbeeAPI.on("frame_object", function(frame) {
				io.emit('update', frame);
			});
			xbee_set = true;
		}
});

// Start Server
var server = http.listen(config.server.listenPort, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listening on: http://%s:%s', host, port);
});
