import { Request, Response , NextFunction} from 'express';
import { userServices } from '../services/userServices';


//USER REGISTER CONTROLLER
export const registerUser = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const userData = req.body;
    const newUser = await userServices.registerUser(userData);
    res.status(201).send({success:true , message:"user register successfully",newUser});
  } catch (error) {
    next(error)
  }
}

//USER LOGIN CONTROLLER
export const loginUser = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
   try {
    res.cookie('accessToken', req.body.accessToken)
    res.status(200).send({success:true, message:"Login Successfully"})
   } catch (error) {
    console.log(error)
    next();
   }
}

//GET SINGLE USER
export const getSingleUser = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    const userData = await userServices.getUserById(+id)
    res.status(200).send({success:true, message:"user found successfully", data:userData})
  } catch (error) {
    next(error)
  }
}

//GET ALL USERS
export const getAllUsers = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const usersData = await userServices.getUsers();
    res.status(200).send({success:true ,AllUsersData:usersData})
  } catch (error) {
    console.log(error);
    next(error)
  }
}

//DELETE USER CONTROLLER
export const deleteUser = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    await userServices.deleteUser(+id);
    res.status(200).send({success:true ,message:"User deleted successfully"})
  } catch (error) {
    next(error)
  }
}

