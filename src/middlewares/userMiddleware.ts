import { Request, Response, NextFunction } from "express"
import { userServices } from "../services/userServices";
import { userUtils } from "../utils/userUtils";



export const loginMiddleware = async(req:Request, res:Response, next:NextFunction) => {
  const user = await userServices.getUserByEmail(req.body.email)

  if(!user)
   return res.status(403).send({message:"user not found"})

  if(! await userUtils.verifyPassword(req.body.password, user.password)) 
   return res.status(401).send({message:"password or email is incorrect"})

  const accessToken = await userUtils.genrateToken({email:req.body.email, password:req.body.password})
  req.body.accessToken = accessToken;
  next();
}


export const registerMiddleware = async(req:Request, res:Response, next:NextFunction) => {
  try {
    const user = await userServices.getUserByEmail(req.body.email)
    console.log(user)

    if(user)
      return res.status(403).send("user already exists with this email")
    
    const hashedPassword = await userUtils.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    next()
  } catch (error) {
    //res.send("error during genrating hashed password")
    next(error);
  }
}


export const isLogedIn = async(req:Request, res:Response, next:NextFunction) => {
  const accessToken = req.get("authorization")?.split(" ")[1];
  const jsonPayload = await userUtils.verifyToken(accessToken)
  if(!jsonPayload) return res.status(403).send({message:"token is invalid"})
  
  req.body.payload = jsonPayload;
  next()
  
}


export const isAdmin = async(req:Request, res:Response, next:NextFunction) => {
  const payload = req.body.payload;
  const userData= await userServices.getUserByEmail(payload.email);
  console.log(userData)

  if(userData && userData.role === 1) return next()

  res.status(401).send({message:"you are not admin"})
}


export const isOperator = async(req:Request, res:Response, next:NextFunction) => {
  const payload = req.body.payload;
  const userData = await userServices.getUserByEmail(payload.email);
  if(userData && userData.role=== 2) return next()

  res.status(401).send({message:"you are not operator or not login"})
}

