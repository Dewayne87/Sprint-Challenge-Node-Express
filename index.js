const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const PORT = 4000;
const actionModelRoute = require('./routes/actionModelRoutes');
const projectModelRoute = require('./routes/projectModelRoutes');
server.use(express.json());
server.use(helmet());
server.use(logger('dev'))
server.disable("etag");

server.use('/api/actionmodel',actionModelRoute);
server.use('/api/projectmodel', projectModelRoute);

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});