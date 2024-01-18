import { NextFunction, Request, Response } from 'express';
import { subscribeServices } from '../services/subscriptionServices';


//SUBSCRIBE A NEW PACK OR ADD-ON NEW PACK
export const subscribePack = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const {user_id} = req.body;
    const {id:pack_id} = req.params;
    const newSubscription = await subscribeServices.subscribePack({st_date:new Date(), userId:user_id, packageId: +pack_id});
    res.status(201).send({success:true , message:"You subscribed new Pack",newSubscription});
  } catch (error) {
    next(error)
  }
}

export const unsubscribePack = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  const {id} = req.params;
  try {
    await subscribeServices.deleteSubscription(+id);
    res.status(201).send({success:true , message:"subscription deleted"});
  } catch (error) {
    next(error)
  }
}


//GET  SUBSCRIBED PACK
export const getSubscription = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    const subscription = await subscribeServices.getSubscription(+id);
    res.status(200).send({success:true, data:subscription})
  } catch (error) {
    next(error)
  }
}

//GET ALL  SUBSCRIBED PACK
export const getAllSubscription = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const allSubscription = await subscribeServices.getAllSubscription();
    res.status(200).send({success:true ,data:allSubscription})
  } catch (error) {
    console.log(error);
    next(error)
  }
}

