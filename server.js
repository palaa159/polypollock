///// Declare all vars
var io = require('socket.io').listen(5000),
	util = require('util'),
///// mongoDB
	mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db,
	/* user = require('./User').User; */
	myDate = new Date(),
	users = [],
	chatLog = [],
	sys = require('sys'),
	fs = require('fs'),
	isDraw = false;
	
//// Building DB server
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('pollockmobile', server, {safe:false});

db.open(function(err, db) {
		util.log("You are logged into the Database");
});

//// init all socket connections
io.sockets.on('connection', onSocketConnection);

function onSocketConnection(sTc) {
	util.log("A new user has connected to the server" + "\n" + "Total user : " + users.length);
	sTc.emit('initMsg', "welcome " + sTc.id);	
	// listen for user
	sTc.on('new user', onNewUser);
	sTc.on('canvas start', onCanvasStart);
	sTc.on('userData', onUserData);
	sTc.on('isDraw', onIsDraw);
}

function onNewUser(userId) {
	util.log("A New user" + userId + "has logged in");
	this.emit('new user', userId);
}

function onCanvasStart(fC) {
	util.log("Canvas Start!");
	this.broadcast.emit('start canvas', "1");
}

function onUserData(userId, posX, posY, cX, cY, lvl) {
	util.log("ID : " + userId + ", X : " + posX + ", Y : " + posY + ", cX : " + cX + ", cY : " + cY + "level" + lvl + ", isDraw : " + isDraw);
	this.broadcast.emit('userData', {id: userId, X: posX, Y: posY, cX: cX, cY:cY, lvl: lvl, isDraw: isDraw});
}

function onIsDraw(fC) {
	util.log(fC);
	if (fC === "1") {
		isDraw = true;
	} else {
		isDraw = false;
	}
}