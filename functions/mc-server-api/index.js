'use strict';

const express = require('express');
const app = express();
const serverHandler = require('./server-handler');

app.get('/', (req, res) => {
    console.log(req);
    const message = 'This is the web API for Longman\'s GCP Minecraft server.<br />'
        + '<table style="border-spacing: 20px;">'
        + '<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>'
        + '<tr><td>GET</td><td><a href="server-status">/server-status</a></td><td>Get the status of the server</td></tr>'
        + '<tr><td>PUT</td><td>/server-start</td><td>Start the server</td></tr>'
        + '<tr><td>PUT</td><td>/server-stop</td><td>Stop the server</td></tr>';
        + '</table>';
    res.status(200).send(message);
});

app.get('/server-status', (req, res) => {
    console.log(req);
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

app.put('/server-start', (req, res) => {
    console.log(req);
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

app.put('/server-stop', (req, res) => {
    console.log(req);
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
