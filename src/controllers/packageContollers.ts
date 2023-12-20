import { NextFunction, Request, Response } from 'express';
import { packageServices } from '../services/packageServices';


//CREATING NEW PACKAGE
export const createPackage = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const packData = req.body;
    const newPack = await packageServices.createPack(packData);
    res.status(201).send({success:true , message:"New Pack Created Successfully",newPack});
  } catch (error) {
    //res.status(500).send({success:false, message: error});
    next(error);
  }
}



//GET SINGLE PACKAGE
export const getPackage = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    const packData = await packageServices.getPack(+id)
    res.status(200).send({success:true, data:packData})
  } catch (error) {
    //res.status(500).send({success:false, message:"Internal Server Error"})
    next()
  }
}



//GET ALL PACKAGES
export const getAllPackages = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const pakesData = await packageServices.getPackes();
    res.status(200).send({success:true ,data:pakesData})
  } catch (error) {
    //res.status(500).send({success:false, message:"Internal Server Error"})
    next(error)
  }
}

//GET ALL PACKAGES
export const deletePackage = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    await packageServices.deletePackage(+id);
    res.status(200).send({success:true, message:"Package deleted successfully"})
  } catch (error) {
    //res.status(500).send({success:false, message:"Internal Server Error"})
    next(error)
  }
}

