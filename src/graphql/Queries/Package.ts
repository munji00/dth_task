import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { packageServices } from "../../services/packageServices";
import {Package} from "../../entities/Package.entity"
import { packageType } from "../TypeDefs/Package";


export const GET_PACKAGE = {
    type:packageType,
    args:{
        id:{type:GraphQLInt}
    },

   async resolve(parents:any ,args:Package){
    return await packageServices.getPack(args.id)
   }
}

export const GET_ALL_PACKAGE = {
    type: new GraphQLList(packageType),

   async resolve(parents:any ,args:Package){
    return await packageServices.getPackes()
   }
}