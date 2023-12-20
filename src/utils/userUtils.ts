import jwt from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt'
import {jsonPayload} from '../interfaces.td'

const secret_key = 'SHD863h%hfy&jhgd$#hg'
const salt = 10;

export const userUtils = {

    async genrateToken(payload:jsonPayload){ 
         return await jwt.sign(payload, secret_key)
    },

    async verifyToken(accessToken:string | undefined) {
        const payload = await jwt.verify(accessToken as string, secret_key)
        return payload;
    },

    async hashPassword( plainPassword:string | undefined){
         return await bcrypt.hash( plainPassword as string, salt)
        
    },

    async verifyPassword(plainPassword:string, hashedPassword:string){
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

}


