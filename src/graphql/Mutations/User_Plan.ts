import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { subscribeServices } from "../../services/subscriptionServices";
import {User_Plan} from "../../entities/User_Plan.entity"
import { planType } from "../TypeDefs/User_Plan";
import { Permissions } from "../../interfaces.td";
import { resMessage } from "../../constants";


export const SUBSCRIBE_PACK = {
    type:GraphQLString,

    args:{
        st_date:{type:GraphQLString},
        userId:{type:GraphQLInt},
        packageId:{type:GraphQLInt}
    },

    async resolve(parent:any ,args:User_Plan, context:Permissions){

        if(context.isLoggedIn)
        {
            await subscribeServices.subscribePack(args)
            return "you subscribed new pack"
        }

        return resMessage.notAuthorized
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
