const messages = require('../../app/controllers/messages');
const { loggerInfo } = require('../../config/log4js');

module.exports = (io, socket) => {
  loggerInfo.info('ws: Nuevo cliente conectado');

  try {
    (async () => {
      socket.emit('messages', await messages.list());
    })();

    socket.on('newMessage', async (message) => {
      await messages.save(message);
      io.sockets.emit('messages', await messages.list());
    });
  } catch (error) {
    socket.emit('error', { error: error.message });
  }
};
