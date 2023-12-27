import { userType} from "../TypeDefs/User";
import { GraphQLInt, GraphQLList} from "graphql";
import { User } from "../../entities/User.entity";
import { userServices } from "../../services/userServices";
import { Permissions } from "../../interfaces.td";


export const GET_SINGLE_USER = {
    type: userType,

    args:{
      id:{type:GraphQLInt}
    },

     async resolve(parent:any ,args:User){
         return await userServices.getUserById(args.id)
    
    } 
}


export const GET_ALL_USER = {
    type: new GraphQLList(userType),

    async resolve(parent:any , args:User, context:Permissions){
       
        console.log(context)
        if(context.isLoggedIn && context.role===1)
        return await userServices.getUsers()

        return []
    }
}


export const USER_WITH_PLAN = {
    type: new GraphQLList(userType),

    args:{
        id:{type:GraphQLInt}
    },

    async resolve(parent:any, args:User, context:Permissions){
        if(context.isLoggedIn && context.role===1)
        return await userServices.getUserwithPlans(args.id)

        return []
    }
}