import { userCommonType} from "../TypeDefs/User";
import { GraphQLInt, GraphQLList, GraphQLString} from "graphql";
import { User } from "../../entities/User.entity";
import { userServices } from "../../services/userServices";
import { Permissions } from "../../interfaces.td";


export const GET_SINGLE_USER = {
    type: userCommonType,

    args:{
      id:{type:GraphQLInt}
    },

     async resolve(parent:any ,args:any, context:Permissions){

        if(context.isLoggedIn)
         return await userServices.getUserById(args.id)

         return null
    
    } 
}


export const GET_ALL_USER = {
    type: new GraphQLList(userCommonType),

    async resolve(parent:any , args:any, context:Permissions){
        if(context.isLoggedIn && context.role===1)
          return await userServices.getUsers()

          return null
    }
}


export const USER_WITH_PLAN = {
    type: userCommonType,

    args:{
        id:{type:GraphQLInt}
    },

    async resolve(parent:any, args:User, context:Permissions){
        if(context.isLoggedIn && context.role===1)
        return await userServices.getUserwithPlans(args.id)

        return null
    }
}