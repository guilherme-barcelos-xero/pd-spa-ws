import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'socket.io';
import routes from './routes';
import sequelizeConnection from './db/config';

const app: Application = express();

app.use(cors());

const upload = multer({
    dest: './uploads'
});

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    // Simulate some async activity
    setTimeout(() => {
        io.emit('file_processed', req?.file?.originalname);
    }, 5000); 

    res.sendStatus(200);
});

app.use('/api/v1', routes);

sequelizeConnection.sync({ force: true });

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