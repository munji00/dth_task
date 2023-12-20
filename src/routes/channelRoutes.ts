import express from 'express';
import { isLogedIn, isOperator } from '../middlewares/userMiddleware';
import * as channelControllers from '../controllers/channelControllers';
import { routesPath } from '../constants';


const channelRoutes = express.Router();

channelRoutes.post(routesPath.CREATE, isLogedIn, isOperator, channelControllers.createChannel);
channelRoutes.get(routesPath.GET, channelControllers.getChannel);
channelRoutes.get(routesPath.GET_ALL, channelControllers.getAllChannels)
channelRoutes.delete(routesPath.DELETE, isLogedIn, isOperator ,channelControllers.deleteChannel)



export default channelRoutes;