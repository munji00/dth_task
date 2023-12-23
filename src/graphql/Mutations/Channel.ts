import { GraphQLInt, GraphQLString } from "graphql";
import { channelServices } from "../../services/channelServices";
import {Channel} from "../../entities/Channel.entity"
import { channelType } from "../TypeDefs/Channel";



export const CREATE_CHANNEL = {
    type:channelType,

    args:{
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        description:{type:GraphQLString},
        pack:{type:GraphQLInt},
    },

    async resolve(parent:any ,args:Channel){
      return await channelServices.createChannel(args)
    }
}

export const DELETE_CHANNEL = {
    type:GraphQLString,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:Channel){
        await channelServices.deleteChannel(args.id)
        return "user deleted successfully"
    }
}