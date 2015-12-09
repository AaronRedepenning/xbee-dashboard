var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var bodyParser = require('body-parser');
var config = require('./config.js');

// Express use for serving static files
app.use(express.static('../client/app'));
app.use(express.static('../client'));

// Confiure app to use bodyParser(), it allows data to be
// extraced from http POSTs
app.use(bodyParser.json());

// XBee Variables
var C = xbee_api.constants,
    xbee_set = false,
		xbeeAPI,
		serialport;

//A Javascript object used to keep track of last respones from XBee radios
//If a radio doesn't respond after 5 seconds it will be disconnected
var XBeeTimeouts = {};

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

app.get('/tasks.json', function(req, res) {
  res.json({Name: "Aaron Redepenning"});
});

app.get('/nodes/:node.json', function(req, res) {
  if((req.params.node == 101) || (req.params.node == 202)) {
    res.sendFile(__dirname + '/nodes/' + req.params.node + '.json');
  }
  else {
    res.status(404).send('Not Found');
  }
});

app.get('/nodes/:node.png', function (req, res) {
  if((req.params.node == 101) || (req.params.node == 202)) {
    res.sendFile(__dirname + '/nodes/' + req.params.node + '.png');
  }
  else {
    res.status(404).send('Not Found');
  }
});

//Socket.io emmitters
io.on('connection', function(socket){
	Set up event handler for recieveing xbee frames
	if (xbee_set === false) {
			xbeeAPI.on("frame_object", function(frame) {
				//Recieved response from XBee, cancel disconnect timeout
				clearTimeout(XBeeTimeouts[frame.remote16]);
        //console.log(frame);
        var data = {
          type: frame.type,
          remote64: frame.remote64,
          remote16: frame.remote16,
          receiveOptions: frame.receiveOptions,
          temperature: frame.data[0],
          humidity: frame.data[1]
        };
				io.emit('update', data);
				//Set a 5 second timeout to wait for next XBee response
				setTimeout(watchXbee(data.remote16), 5000);
			});
			xbee_set = true;
		}
});

var watchXbee = function(id) {
	console.log('XBee with remote16: ' + id + " has been disconnected");
};

// Start Server
var server = http.listen(config.server.listenPort, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listening on: http://%s:%s', host, port);
});
