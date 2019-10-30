import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import DeviceIntegrationController from './app/controllers/DeviceIntegrationController';
import DeviceController from './app/controllers/DeviceController';
import UserDeviceController from './app/controllers/UserDeviceController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import TestController from './app/controllers/TestController';

import validateDeviceIntegrationStore from './app/validators/DeviceIntegrationStore';
import validateDeviceStore from './app/validators/DeviceStore';
import validateUserDeviceStore from './app/validators/UserDeviceStore';
import validateUserDeviceUpdate from './app/validators/UserDeviceUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

import authMiddleware from './app/middlewares/auth';
import authDevice from './app/middlewares/authDevice';

const routes = new Router();
const upload = multer(multerConfig);

routes.get(
  '/device/integration',
  authDevice,
  validateDeviceIntegrationStore,
  DeviceIntegrationController.store
);

routes.get('/test', TestController.store);
routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/devices', validateDeviceStore, DeviceController.store);
routes.get('/devices', DeviceController.index);
routes.put('/devices/:id', DeviceController.update);

routes.get('/devices/associate', UserDeviceController.index);
routes.put(
  '/devices/associate/:id',
  validateUserDeviceUpdate,
  UserDeviceController.update
);
routes.post(
  '/devices/associate',
  validateUserDeviceStore,
  UserDeviceController.store
);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.all('/*', (req, res) => {
  res.status(400).json({ error: 'This resource cannot be found' });
});

export default routes;
