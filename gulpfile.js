'use strict';

const fs = require('fs');
const tasks = fs.readdirSync('./gulp');

tasks.forEach((task) => {
    require('./gulp/' + task);
});
