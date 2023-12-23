import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList} from "graphql";

export const planType = new GraphQLObjectType({
    name:"User_Plan",
    fields:{
        id:{type:GraphQLID},
        st_date:{type:GraphQLString},
        userId:{type:GraphQLInt},
        packageId:{type:GraphQLInt},
    }
})