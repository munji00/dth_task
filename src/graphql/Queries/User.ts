import { userType} from "../TypeDefs/User";
import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { User } from "../../entities/User.entity";
import { userServices } from "../../services/userServices";


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

    async resolve(){
        return await userServices.getUsers()
    }
}


export const USER_WITH_PLAN = {
    type: new GraphQLList(userType),

    args:{
        id:{type:GraphQLInt}
    },

    async resolve(parent:any, args:User){
        return await userServices.getUserwithPlans(args.id)
    }
}