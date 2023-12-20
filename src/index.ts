import swaggerUi from 'swagger-ui-express'
import express from 'express';
import * as swaggerDocuments from "./postman/swagger.json"
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import cors from 'cors'
import channelRoutes from './routes/channelRoutes';
import packageRoutes from './routes/packageRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import { credentials } from './constants';
import { errorHandler } from './errorHandlers/globalErrHandler';
import { swaggerSetup } from './configrations/swaggerConfig';


export const app = express();

//application level middileware
app.use(cors());
app.use(express.json());


//swaggerSetup();
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

//connection to database 
AppDataSource.initialize().then(()=> {
    console.log("mysql connected")
    app.listen(credentials.PORT, ()=> {
    console.log(`server is running on port ${credentials.PORT}`)
})
}).catch((error)=>{
    console.log(error)
})

//global error handlers
app.use(errorHandler)


//routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/package", packageRoutes)
app.use("/api/v1/channel", channelRoutes)
app.use("/api/v1/subscription", subscriptionRoutes);


