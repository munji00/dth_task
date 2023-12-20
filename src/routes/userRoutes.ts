import express from 'express'
import * as userControllers from '../controllers/userController'
import * as middleware from '../middlewares/userMiddleware'
import { routesPath } from '../constants';


const userRoutes = express.Router();

userRoutes.post(routesPath.USER_SIGNUP,  middleware.registerMiddleware,  userControllers.registerUser);
userRoutes.post(routesPath.USER_SIGNIN,  middleware.loginMiddleware,  userControllers.loginUser);
userRoutes.get(routesPath.GET,  middleware.isLogedIn,  userControllers.getSingleUser);
userRoutes.get(routesPath.GET_ALL,  middleware.isLogedIn,  middleware.isAdmin,  userControllers.getAllUsers)
userRoutes.delete(routesPath.DELETE,  middleware.isLogedIn,  middleware.isAdmin,  userControllers.deleteUser)


export default userRoutes;




