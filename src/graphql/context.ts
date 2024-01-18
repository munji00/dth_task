import { userServices } from "../services/userServices";
import { Request , NextFunction } from "express";
import { userUtils } from "../utils/userUtils";
import { Permissions } from "../interfaces.td";

// context function
export const contextObject = async (req:Request ): Promise<Permissions> => {
   const token = req.body.variables?.headers? req.body.variables.headers.Authorization.split(" ")[1]:null;

  const permissions: Permissions = {
    isLoggedIn: false,
    role:0,
  };

  if(!token) return permissions;

  try {
    const userPayload = await userUtils.verifyToken(token);
    if (userPayload) permissions.isLoggedIn = true;
    if (userPayload && userPayload.email) {
      const user = await userServices.getUserByEmail(userPayload.email);
      permissions.role = user?.role as number;
    }
  
  } catch (err) {
    console.log(err);
  }
  return permissions;
};
