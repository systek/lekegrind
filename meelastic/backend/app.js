var express = require('express');
var app = express();

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');

var elasticClient = require('./lib/elasticClient');
var routes = require('./routes/index');
var api = require('./routes/api');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../frontend'));

app.use('/', routes);
app.use('/api', api);

var WebSocketServer = require('ws').Server;
var WebSocket = require('ws');
var wss = new WebSocketServer({port: 8080});
var webSocketClient;

wss.on('connection', function(socket) {
    webSocketClient = socket;
    console.log("Received WebSocket connection...");
    socket.on('message', function(message) {
        console.log('received from websocket: %s', message);
    });
});

var ws = new WebSocket('ws://stream.meetup.com/2/rsvps');
ws.on('message', function(message) {
    console.log('received data from meetup websocket: %s', message);
    if (webSocketClient) {
        webSocketClient.send(message);
    }

    elasticClient.create({
        index: 'lekegrind',
        type: 'meelastic',
        body: message
    }, function (error, response) {
        if (error) {
            console.error('Error saving in elasticsearch: ' + error);
        } else {
            console.log('Saving in ElasticSearch OK');
        }
    });

});

module.exports = app;
