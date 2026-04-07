require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { initSocket } = require('./socket/inventorySocket');

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5001;

// Socket.io
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
  pingTimeout: 60000,
});
initSocket(io);
app.set('io', io);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/artisans', require('./routes/artisanRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/haats', require('./routes/haatRoutes'));

app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

// DB connect with retry
async function connectDB() {
  for (let i = 0; i < 5; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB connected');
      return;
    } catch (e) {
      console.log(`DB attempt ${i + 1} failed. Retrying...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  process.exit(1);
}

async function start() {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`\n🌿 Karagiri server → http://localhost:${PORT}\n`);
  });
  httpServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} in use. Run: lsof -ti:${PORT} | xargs kill -9`);
    }
    process.exit(1);
  });
}

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
process.on('uncaughtException', (e) => {
  console.error('Uncaught:', e.message);
  process.exit(1);
});

start();
