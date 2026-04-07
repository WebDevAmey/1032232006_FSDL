let _io = null;

function initSocket(io) {
  _io = io;
  io.on('connection', () => {});
}

function emitStock(io, productId, stock) {
  const instance = io || _io;
  if (instance) instance.emit('stock_update', { productId, stock });
}

function emitHaat(io, haatId, data) {
  const instance = io || _io;
  if (instance) instance.emit('haat_update', { haatId, ...data });
}

module.exports = { initSocket, emitStock, emitHaat };
