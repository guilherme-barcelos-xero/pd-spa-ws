const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const upload = multer({
    dest: './uploads'
});

const socketList = [];
app.post('/api/upload', upload.single('file'), async (req, res) => {
    // Simulate some async activity
    setTimeout(() => {
        io.emit('file_processed', req.file.originalname);
    }, 5000, this);

    res.sendStatus(200);
});


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});