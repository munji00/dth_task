import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";
import { planType } from "./User_Plan";

export const userRegisterType = new GraphQLObjectType({
    name:"UserRegister",
    fields:{
        username: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }, 
        role: { type: new GraphQLNonNull(GraphQLInt) },
        active: { type: new GraphQLNonNull(GraphQLBoolean)},
        user_plan: { type: new GraphQLList(planType) }
    }
})


export const userCommonType = new GraphQLObjectType({
    name:"UserCommon",
    fields:{
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }, 
        role: { type: new GraphQLNonNull(GraphQLInt) },
        active: { type: new GraphQLNonNull(GraphQLBoolean) },
        user_plan: { type: new GraphQLList(planType) }
    }
})