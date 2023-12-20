import postmanToOpenApi from "postman-to-openapi";
import path from "path";
import  YAML from "yamljs"
import swaggerUi from 'swagger-ui-express'
import { app } from "../index";


export const swaggerSetup = () => {
    postmanToOpenApi("../postman/swagger.json",
     path.join("../postman/swagger.yml"),
     {defaultTag:"General"}
     ).then((response)=> {
        let result = YAML.load("../postman/swagger.yml");
        result.servers[0].url = "/";
        app.use("/swagger", swaggerUi.serve, swaggerUi.setup(result));

     }).catch((error)=> console.log(error))
}