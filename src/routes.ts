import { Router } from 'express';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/authenticateDeliverymanController';
import { FindAllDeliveriresController } from './modules/clients/deliveries/FindAllDeliveriesController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/createDeliverymanController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/findAllDeliveryman/FindAllDeliveriesDeliverymanController';

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();

const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClient = new FindAllDeliveriresController();
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post('/client/authenticate', authenticateClientController.handle);
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle);

routes.post('/client/', createClientController.handle);
routes.post('/deliveryman', createDeliverymanController.handle);

routes.post('/delivery', ensureAuthenticateClient, deliveryController.handle);
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle);

routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle);
routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle);
routes.get('/deliveryman/deliverires', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle);
routes.put('/delivery/updateEndDate/:id', ensureAuthenticateDeliveryman, updateEndDateController.handle);

export { routes };
