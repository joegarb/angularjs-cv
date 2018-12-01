'use strict';

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();
app.use(helmet());
app.enable('trust proxy');

app.use(express.static(path.resolve(__dirname, 'dist')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
