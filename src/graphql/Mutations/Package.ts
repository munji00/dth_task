import {GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import { packageServices } from "../../services/packageServices";
import {Package} from "../../entities/Package.entity"
import { packageType } from "../TypeDefs/Package";
import { permissions } from "../../interfaces.td";


export const CREATE_PACKAGE = {
    type:packageType,

    args:{
        name:{type:GraphQLString},
        duration:{type:GraphQLString},
        price:{type:GraphQLInt}
    },

    async resolve(parent:any ,args:Package, context:permissions){
        if(context.isLogedin && context.role===2)
        return await packageServices.createPack(args)

        return []
    }
}

export const DELETE_PACKAGE ={
type:GraphQLString,
args:{
    id:{type:GraphQLInt}
},
async resolve(parent:any , args:Package, context:permissions){
    if(context.isLogedin && context.role===2)
    {
        await packageServices.deletePackage(args.id)
        return "package deleted successfully"
    }

    return " you are not authorized"
}
}
