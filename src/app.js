import 'dotenv/config';

import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();
    this.app = http.Server(this.server);
    this.io = socketIO(this.app);

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.encapsulateSocket();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(Sentry.Handlers.requestHandler());
    }

    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    this.io.on('connection', socket => {
      console.log(socket.id);
    });
  }

  routes() {
    this.server.use(routes);

    if (process.env.NODE_ENV === 'production') {
      this.server.use(Sentry.Handlers.errorHandler());
    }
  }

  encapsulateSocket() {
    this.server.use((req, res, next) => {
      req.io = this.io;
      return next();
    });
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().app;
