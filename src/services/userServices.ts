
import { User } from "../entities/User.entity"
import { AppDataSource } from "../data-source"

const user = AppDataSource.getRepository(User)

export const userServices = {
   async registerUser(userData:Partial<User>): Promise<User> {
        const newUser = await user.create(userData);
        const savedUser = await user.save(newUser);
        return savedUser;
    },

    async getUserwithPlans(id:number): Promise<User | null> {
        return await user.findOne({where:{id} , relations:{user_plan:true}});
    },

    async getUserById(id:number): Promise<User | null> {
        return await user.findOne({where:{id}});
    },

    async getUserByEmail(email:string): Promise<User | null> {
        return await user.findOne({where:{email}});
    },

    async getUsers():Promise<User[]> {
        return await AppDataSource.manager.find(User);
    },

    async deleteUser(id:number):Promise<void> {
        await user.delete({id});
    },
    
}
