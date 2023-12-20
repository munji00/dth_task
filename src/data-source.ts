import "reflect-metadata"
import { DataSource } from "typeorm"
import { User} from './entities/User.entity'
import { User_Plan } from "./entities/User_Plan.entity";
import { Channel } from "./entities/Channel.entity";
import { Package } from "./entities/Package.entity";
import { credentials } from "./constants";
export const AppDataSource = new DataSource({
    type:'mysql',
    host: credentials.HOST,
    username: credentials.DB_USERNAME,
    password: credentials.DB_PASSWORD,
    database: credentials.DB_NAME,
    synchronize: true,
    entities: [User, Channel, User_Plan, Package],
    subscribers: [],
    migrations: [],
})