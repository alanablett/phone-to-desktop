var express = require("express");
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

// Bootstrap the essentials
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/templates');
server.listen(8082);

// Home view (show the url associated with the browsers socket.io id)
app.get('/', function (req, res) {
	res.render("desktop.html");
});

// All other requests get the mobile view
app.get('*', function(req,res) {
	url = req.url.substring(1);
	res.render("mobile.html");
});

// Store connections in an array that links socket.io id's to "url's"
var connections = [];

io.sockets.on('connection', function (socket) {
	
	// When a desktop client connects generate a random string for a url. We'll assign
	// this the socket id so we know which client our mobile user should control. We pass
	// this url to the desktop using desktop.callback so it can be displayed on screen
	socket.on('desktop.connect', function (data) {
		url = Math.random().toString(36).substr(2, 5);
		connections[url] = socket.id;
		socket.emit('desktop.callback', { url : url });
	});
	
	// When the mobile calls the mobile.control function, we are passed the url that the mobile
	// is on, and the direction we want the client to move in. We check for the clients
	// socket.io id based on the url, then pass the direction to that client. The client listens
	// for this call and will scroll the window in the correct direction
	socket.on('mobile.control', function(data){
		url = data.url;
		id = connections[url];
		io.sockets.socket(id).emit('desktop.move', { direction : data.direction });
	});
});