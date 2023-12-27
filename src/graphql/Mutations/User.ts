import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import { userServices } from "../../services/userServices";
import {userUtils} from '../../utils/userUtils'
import { User} from "../../entities/User.entity"
import { userType } from "../TypeDefs/User";
import { Permissions } from "../../interfaces.td";
import { resMessage } from "../../constants";



export const CREATE_USER = {
    type:GraphQLString,

    args:{
        username:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        role:{type:GraphQLInt},
        active:{type:GraphQLBoolean}
    },

    async resolve(parent:any ,args:User){
      const { username, name,  email, password, role, active} = args;
      try {
        const isExits = await userServices.getUserByEmail(args.email)
        if(isExits) return "user already exist"
        const hashed_password=  await userUtils.hashPassword(password)
        userServices.registerUser({username, name, email, password:hashed_password,role, active })
      } catch (error) {
        return "error in creating user"
      }
      return "user created succesfully";
    }
}

export const DELETE_USER = {
    type:GraphQLString,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:User, context:Permissions){
     if(context.isLoggedIn && context.role===1)
     {
       await userServices.deleteUser(args.id)
       return "user deleted successfully"
     }


     return resMessage.notAuthorized
  }
}