import { GraphQLInt, GraphQLString } from "graphql";
import { channelServices } from "../../services/channelServices";
import {Channel} from "../../entities/Channel.entity"
import { channelType } from "../TypeDefs/Channel";
import { Permissions } from "../../interfaces.td";



export const CREATE_CHANNEL = {
    type:channelType,

    args:{
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        description:{type:GraphQLString},
        pack:{type:GraphQLInt},
    },

    async resolve(parent:any ,args:Channel, context:Permissions){

        if(context.isLoggedIn && context.role ===2)
        return await channelServices.createChannel(args)

        return []
    }
}

export const DELETE_CHANNEL = {
    type:GraphQLString,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:Channel, context:Permissions){

       if(context.role === 2 && context.isLoggedIn)
       {
        await channelServices.deleteChannel(args.id)
        return "channel deleted successfully"
       }

       return " user not authorized"
    }
}