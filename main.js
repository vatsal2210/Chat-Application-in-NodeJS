var express = require('express'),
	app 	= express(),
	server 	= require('http').createServer(app),
	socketio= require('socket.io').listen(server),
	path 	= require('path'),
	bodyParser	= require('body-parser');

logger = require('./util/logger.js')();
logger.info("-------- Starting Chat Application --------  " , new Date());

app.use(bodyParser.json({
    limit: 5242880
}));

app.use(bodyParser.urlencoded({ 
	extended: true 
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

var appContext = {};
appContext.app = app;
appContext.socketIO = socketio;


app.get('/', function(req,res){
	res.redirect('/index');
});

server.listen(80, function(){							
	logger.info('Start listening on Port *.80');
	require('./routes/module.js')(appContext);
}); 

