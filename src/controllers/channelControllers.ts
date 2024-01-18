import { NextFunction, Request, Response } from 'express';
import { channelServices } from '../services/channelServices';


//CREATING NEW CHANNEL
export const createChannel = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const channelData = req.body;
    const newChannel = await channelServices.createChannel(channelData);
    res.status(201).send({success:true , message:"New Channel Created Successfully",newChannel});
  } catch (error) {
    next(error);
  }
}


//GET SINGLE CHANNEL
export const getChannel = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
    const channelData = await channelServices.getChannel(+id);
    res.status(200).send({success:true, data:channelData})
  } catch (error) {
    next(error)
  }
}

//GET ALL CHANNEL
export const getAllChannels = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const channelsData = await channelServices.getChannels();
    res.status(200).send({success:true ,data:channelsData})
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//DELETE CHANNEL
export const deleteChannel = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
  const {id} = req.params;
  try {
     await channelServices.deleteChannel(+id);
    res.status(200).send({success:true ,message:"channel deleted successfully"})
  } catch (error) {
    console.log(error);
    next(error);
  }
}
