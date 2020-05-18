'use strict';

const cors = require('cors');
const express = require('express');

const auth = require('./auth');
const serverHandler = require('./server-handler');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    const message = 
          'This is the web API for Longman\'s GCP Minecraft server.<br />'
        + '<table style="border-spacing: 30px;">'
        + '<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>'
        + '<tr><td>GET</td><td>/server-status</td><td>Get the server status</td></tr>'
        + '<tr><td>PUT</td><td>/server-start</td><td>Start the server</td></tr>'
        + '<tr><td>PUT</td><td>/server-stop</td><td>Stop the server</td></tr>'
        + '</table><br />'
        + 'All API requests require a valid "token" parameter in the request body.';
    res.status(200).send(message);
});

app.get('/server-status', auth.authenticate, (req, res) => {
    console.log('Getting server status...');
        serverHandler.getServerStatus()
            .then((serverStatus) => {
                console.log('Server status:', serverStatus);
                res.status(200).send(serverStatus);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err);
            });
});

app.put('/server-start', auth.authenticate, (req, res) => {
    console.log('Starting server...');
        serverHandler.startServer()
            .then(() => {
                console.log('Server started');
                res.sendStatus(200);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err);
            });
});

app.put('/server-stop', auth.authenticate, (req, res) => {
    console.log('Stopping server...');
        serverHandler.stopServer()
            .then(() => {
                console.log('Server stopped');
                res.sendStatus(200);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err);
            });
});

exports.app = app;
