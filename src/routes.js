import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeviceController from './app/controllers/DeviceController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';

import validateSessionStore from './app/validators/SessionStore';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

import authMiddleware from './app/middlewares/auth';

import File from './app/models/File';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/device/save', DeviceController.store);
routes.get('/', async (req, res) => {
  const files = await File.findAll();

  return res.json(files);
});

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
