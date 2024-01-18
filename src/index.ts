import swaggerUi from 'swagger-ui-express'
import express ,{Express}from 'express';
import YAML from 'yamljs'
import { AppDataSource } from './data-source';
import { graphqlHTTP } from 'express-graphql';
import userRoutes from './routes/userRoutes';
import cors from 'cors'
import channelRoutes from './routes/channelRoutes';
import packageRoutes from './routes/packageRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import { credentials } from './constants';
import { errorHandler } from './errorHandlers/globalErrHandler'
import {contextObject} from './graphql/context'
import { schema } from './graphql/schema';



const app:Express = express();

//application level middileware
app.use(cors());
app.use(express.json());



//swaggerSetup();
const swaggerDocs = YAML.load('src/swagger/api_definition.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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

//graphql server setup
app.use('/graphql', graphqlHTTP(async (req: any) => ({
  schema,
  context: await contextObject(req),
  graphiql: true,
})));

export default app;
