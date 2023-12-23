import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList} from "graphql";
import { channelType } from "./Channel";

export const packageType = new GraphQLObjectType({
    name:"Package",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        duration:{type:GraphQLString},
        price:{type:GraphQLInt},
        channels:{type:new GraphQLList(channelType)}
    }
})