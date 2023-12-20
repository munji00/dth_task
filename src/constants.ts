import env from 'dotenv';
env.config()

export const credentials = {
    PORT:process.env.PORT || 6008,
    DB_USERNAME:process.env.DB_USERNAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
    DB_TYPE: process.env.DB_TYPE,
    HOST : process.env.HOST
}

export const routesPath = {
    USER_SIGNUP:'/auth/signup',
    USER_SIGNIN:'/auth/signin',
    SUBSCRIBE_PACK:'/subscribe/:id',
    ADD_ON_PACK:'/add-on/:id',
    GET:'/get/:id',
    GET_ALL:'/get-all',
    DELETE:'/delete/:id',
    CREATE:'/create',
}