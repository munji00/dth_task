import express from 'express';
import * as packageContollers from '../controllers/packageContollers';
import { isLogedIn, isOperator } from '../middlewares/userMiddleware';
import { routesPath } from '../constants';

const packageRoutes = express.Router();

packageRoutes.post(routesPath.CREATE, isLogedIn, isOperator, packageContollers.createPackage);
packageRoutes.get(routesPath.GET_ALL, isLogedIn, packageContollers.getAllPackages);
packageRoutes.get(routesPath.GET, isLogedIn, packageContollers.getPackage);
packageRoutes.delete(routesPath.DELETE, isLogedIn, isOperator,packageContollers.deletePackage)




export default packageRoutes;