import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { packageServices } from "../../services/packageServices";
import {Package} from "../../entities/Package.entity"
import { packageType } from "../TypeDefs/Package";


export const CREATE_PACKAGE = {
    type:packageType,

    args:{
        name:{type:GraphQLString},
        duration:{type:GraphQLString},
        price:{type:GraphQLInt}
    },

    async resolve(parent:any ,args:Package){
       return await packageServices.createPack(args)
    }
}

export const DELETE_PACKAGE ={
type:GraphQLString,
args:{
    id:{type:GraphQLInt}
},
async resolve(parent:any , args:Package){
    await packageServices.deletePackage(args.id)
    return "package deleted successfully"
}
}
