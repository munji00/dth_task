import { channelType } from "../TypeDefs/Channel";
import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { Channel } from "../../entities/Channel.entity";
import { channelServices } from "../../services/channelServices";


export const GET_SINGLE_CHANNEL = {
    type: channelType,

    args:{
      id:{type:GraphQLInt}
    },

     async resolve(parent:any ,args:Channel){
         return await channelServices.getChannel(args.id)
    } 
}

export const GET_ALL_CHANNEL = {
    type: new GraphQLList(channelType),

    async resolve(){
        return await channelServices.getChannels()
    }
}
