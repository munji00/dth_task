import { userServices } from "../services/userServices";
import { userUtils } from "../utils/userUtils";
import { Permissions } from "../interfaces.td";

// context function
export const contextObject = async (req: any): Promise<Permissions> => {
  const token = req.get("authorization")?.split(' ')[1] || '';
  const permissions: Permissions = {
    isLoggedIn: false,
    role:0,
  };

  try {
    const userPayload = await userUtils.verifyToken(token);
    if (userPayload) permissions.isLoggedIn = true;

    if (userPayload && userPayload.email) {
      const user = await userServices.getUserByEmail(userPayload.email);
      permissions.role = user?.role as number;
    }
  
  } catch (err) {
    throw new Error('Authentication failed');
  }
  
  return permissions;
};
