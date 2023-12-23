import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { subscribeServices } from "../../services/subscriptionServices";
import {User_Plan} from "../../entities/User_Plan.entity"
import { planType } from "../TypeDefs/User_Plan";


export const GET_SUBSCRIPTION = {
    type:planType,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:User_Plan){
    return await subscribeServices.getSubscription(args.id)
   }
}

export const GET_ALL_SUBSCRIPTION = {
    type: new GraphQLList(planType),

   async resolve(parents:any ,args:User_Plan){
    return await subscribeServices.getAllSubscription()
   }
}