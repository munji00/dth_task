import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } from "graphql";
import { planType } from "./User_Plan";

export const userType = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{type:GraphQLID},
        username:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString}, 
        role:{type:GraphQLInt},
        active:{type:GraphQLBoolean},
        user_plan:{type: new GraphQLList(planType)}
    }
})