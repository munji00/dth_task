import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } from "graphql";

export const channelType = new GraphQLObjectType({
    name:"Channel",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        description:{type:GraphQLString},
        pack:{type:GraphQLInt} 
    }
})