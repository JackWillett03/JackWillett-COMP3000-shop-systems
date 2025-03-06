const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); 
const ShopListroute = require('./route/ShopListroute');
const StockListroute = require('./route/StockListroute');
const Salesroute = require('./route/Salesroute');
const Usersroute = require('./route/Usersroute');
const Staffroute = require('./route/Staffroute');
const app = express();
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://shop-deployment-test-front.onrender.com", 
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});


dotenv.config(); // Load environment variables

// MongoDB connection
const mongoURL = process.env.CONNECTION; // Connection string
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use(cors(`https://shop-deployment-test-front.onrender.com`))

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Route handlers
app.use('/shops', ShopListroute);
app.use('/stocks', StockListroute);
app.use('/sales', Salesroute);
app.use('/users', Usersroute);
app.use('/staff', Staffroute);

// Check API is running
app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected", socket.id);
  })
})

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export app and io
module.exports = {app, io};
