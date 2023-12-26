import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { subscribeServices } from "../../services/subscriptionServices";
import {User_Plan} from "../../entities/User_Plan.entity"
import { planType } from "../TypeDefs/User_Plan";
import { permissions } from "../../interfaces.td";


export const GET_SUBSCRIPTION = {
    type:planType,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:User_Plan, context:permissions){

    if(context.isLogedin)
     return await subscribeServices.getSubscription(args.id)

     return {}
   }
}

export const GET_ALL_SUBSCRIPTION = {
    type: new GraphQLList(planType),

   async resolve(parents:any ,args:User_Plan, context:permissions){
    if(context.isLogedin)
     return await subscribeServices.getAllSubscription()

     return []
   }
}