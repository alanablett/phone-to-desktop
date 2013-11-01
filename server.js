var express = require("express");
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/templates');

server.listen(8082);

// Desktop
app.get('/', function (req, res) {
	res.render("desktop.html");
});

var desktopId;
var url;
var connections = [];

io.sockets.on('connection', function (socket) {
	
	socket.on('desktop.connect', function (data) {
		url = Math.random().toString(36).substring(10);
		connections[url] = socket.id;
		socket.emit('desktop.callback', { url : url });
	});
	
	socket.on('mobile.control', function(data){
		url = data.url;
		id = connections[url];
		io.sockets.socket(id).emit('desktop.move', { direction : data.direction });
	});
	
	socket.on('mobile.connect', function (data) {
		
	});
});

app.get('*', function(req,res) {
	url = req.url.substring(1);
	res.render("mobile.html");
});

//Mobile
// app.get('/', function (req, res) {
// 	res.render("mobile.html");
// });