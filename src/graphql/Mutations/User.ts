import { GraphQLBoolean, GraphQLInt, GraphQLString } from "graphql";
import { userServices } from "../../services/userServices";
import {userUtils} from '../../utils/userUtils'
import { User} from "../../entities/User.entity"
import { Permissions } from "../../interfaces.td";
import { resMessage } from "../../constants";
import { userCommonType } from "../TypeDefs/User";



export const CREATE_USER = {
    type:userCommonType,

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
        if(isExits) return null
        const hashed_password=  await userUtils.hashPassword(password)
        return  await userServices.registerUser({username, name, email, password:hashed_password,role, active })
      } catch (error) {
        return null
      }
    }
}

export const LOGIN_USER = {
    type:GraphQLString,
    args:{
        email:{type:GraphQLString},
        password:{type:GraphQLString}
    },

    async resolve(parents:any ,args:User){
     try {
       const isExits = await userServices.getUserByEmail(args.email);
       if(!isExits) 
          return "User Not Found";
       if(! await userUtils.verifyPassword(args.password, isExits.password)) 
          return "password or email is incorrect"

      return await  userUtils.genrateToken({email:args.email, password:args.password}) as string
     } catch (error:any) {
      return error.message
     }
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