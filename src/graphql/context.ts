import { userServices } from "../services/userServices";
import { userUtils } from "../utils/userUtils";

export let permissions={
    isLogedin:false,
    role:0
}

 export const contextObject = async (req: any ) => {
  const token = req.get("authorization").split(' ')[1] || '';

  try {
    const userPayload = await userUtils.verifyToken(token);
      
     if(userPayload) permissions.isLogedin= true;

     if(userPayload && userPayload.email){
      const user = await userServices.getUserByEmail(userPayload.email)
      permissions.role = user?.role as number;
     }
  
  } catch (err) {
    throw new Error('Authentication failed');
  }
  return permissions;
};