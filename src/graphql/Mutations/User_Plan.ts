import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { subscribeServices } from "../../services/subscriptionServices";
import {User_Plan} from "../../entities/User_Plan.entity"
import { planType } from "../TypeDefs/User_Plan";


export const SUBSCRIBE_PACK = {
    type:planType,

    args:{
        st_date:{type:GraphQLString},
        userId:{type:GraphQLInt},
        packageId:{type:GraphQLInt}
    },

    async resolve(parent:any ,args:User_Plan){
       return await subscribeServices.subscribePack(args)
    }
}

export const UNSUBSCRIBE_PACK ={
type:GraphQLString,
args:{
    id:{type:GraphQLInt}
},
async resolve(parent:any , args:User_Plan){
    await subscribeServices.deleteSubscription(args.id)
    return "pack unsubscribed successfully"
}
}
