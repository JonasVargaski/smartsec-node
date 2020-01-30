import './bootstrap';

import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import requestIp from 'request-ip';
import routes from './routes';
import sentryConfig from './config/sentry';

import Socket from './webSocket';

import './database';

class App {
  constructor() {
    this.server = express();
    this.app = http.Server(this.server);
    Socket.init(this.app);

    if (process.env.NODE_ENV === 'production') {
      Sentry.init(sentryConfig);
    }

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.disable('x-powered-by');
    this.server.set('trust proxy', true);

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    this.server.use(requestIp.mw());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
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
