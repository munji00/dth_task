import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as userQueries from "./Queries/User";
import * as userMutations from "./Mutations/User";
import * as packageQueries from "./Queries/Package"
import * as packageMutations from "./Mutations/Package";
import * as channelQueries from "./Queries/Channel";
import * as channelMutations from './Mutations/Channel';
import * as subscriptionsQueries from './Queries/User_Plan';
import * as subscriptionMutation from './Mutations/User_Plan'


const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
      getUser: userQueries.GET_SINGLE_USER,
      getAllUser:userQueries.GET_ALL_USER,
      userWithPlans:userQueries.USER_WITH_PLAN,
      getPackage:packageQueries.GET_PACKAGE,
      getAllPackage:packageQueries.GET_ALL_PACKAGE,
      getChannel:channelQueries.GET_SINGLE_CHANNEL,
      getAllChannel:channelQueries.GET_ALL_CHANNEL,
      getSubscription:subscriptionsQueries.GET_SUBSCRIPTION,
      getAllSubscriptions:subscriptionsQueries.GET_ALL_SUBSCRIPTION
    }
})

const RootMutation = new GraphQLObjectType({
    name:"RootMutation",
    fields:{
     createUser:userMutations.CREATE_USER,
     signinUser:userMutations.LOGIN_USER,
     deleteUser:userMutations.DELETE_USER,
     createPackage:packageMutations.CREATE_PACKAGE,
     deletePackage:packageMutations.DELETE_PACKAGE,
     createChannel:channelMutations.CREATE_CHANNEL,
     deleteChannel:channelMutations.DELETE_CHANNEL,
     subscribePack:subscriptionMutation.SUBSCRIBE_PACK,
     unsubscribePack:subscriptionMutation.UNSUBSCRIBE_PACK
    }
})


export const schema = new GraphQLSchema({query:RootQuery, mutation:RootMutation})