const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const appMiddleware = require('./app/middlewares/appMiddlewares')

const config = require('./config/config');
const { loggerInfo, loggerError } = require('./config/log4js');

if (cluster.isMaster && config.MODO_CLUSTER) {
    loggerInfo.info('num CPUs', numCPUs)
    loggerInfo.info(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // creamos un worker para cada cpu
    }

    // controlamos la salida de los workers
    cluster.on('exit', worker => {
        loggerInfo.info('Worker', worker.process.pid, 'died');
        cluster.fork();
    });


} else {
    appMiddleware(app)
    // SOCKETS
    const webSocket = require('./routes/socket/chat');
    const onConnection = (socket) => {
        webSocket(io, socket);
    }
    io.on('connection', onConnection);

    const server = http.listen(config.PORT, () => {
        loggerInfo.info(`Servidor ejecutandose en http://localhost:${config.PORT}`);
        loggerInfo.info('Perfil administrador:', config.admin);
        loggerInfo.info(`Entorno de desarrollo=${config.NODE_ENV} - Persistencia=${config.PERSISTENCIA}`);
    });

    server.on('error', error => {
        loggerError.error(`Error de servidor: ${error.message}`)
    });

}