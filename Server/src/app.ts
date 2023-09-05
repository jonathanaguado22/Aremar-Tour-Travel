import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import mainRouter from './routes';

// import fileUpload from 'express-fileupload';
import './db';

import { createServer } from 'http';
import { Server } from 'socket.io';

const cors = require('cors');
const path = require('path');

const server: Application = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use(cors());
server.use((req, res, next) => {
  res.setHeader('Set-Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



// server.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: './uploads/',
//   })
// );

// server.use(mainRouter);

server.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const app = createServer(server);
const io = new Server(app);

export { app, io };