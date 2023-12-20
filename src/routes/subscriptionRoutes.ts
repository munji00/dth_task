import express from 'express';
import { isLogedIn, isOperator } from '../middlewares/userMiddleware';
import * as subsControolers from '../controllers/subscriptionControllers';
import { routesPath } from '../constants';

const subscriptionRoutes = express.Router();

subscriptionRoutes.post(routesPath.SUBSCRIBE_PACK, isLogedIn, subsControolers.subscribePack);
subscriptionRoutes.post(routesPath.ADD_ON_PACK, isLogedIn, subsControolers.subscribePack)
subscriptionRoutes.delete(routesPath.DELETE, isLogedIn, isOperator, subsControolers.unsubscribePack)
subscriptionRoutes.get(routesPath.GET, isLogedIn, isOperator, subsControolers.getSubscription)
subscriptionRoutes.get(routesPath.GET_ALL, isLogedIn, isOperator, subsControolers.getAllSubscription)

export default subscriptionRoutes;