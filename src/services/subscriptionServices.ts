import { User_Plan } from "../entities/User_Plan.entity"
import { AppDataSource } from "../data-source"

const user_plan = AppDataSource.getRepository(User_Plan)

export const subscribeServices = {
   async subscribePack(subscribeData:Partial<User_Plan>): Promise<User_Plan> {
        const newChannel = await user_plan.create(subscribeData);
        const savedChannel = await user_plan.save(newChannel);
        return savedChannel;
    },

    async getSubscription(id:number): Promise<User_Plan| null> {
        return await user_plan.findOne({where:{id}});
    },

    async getAllSubscription():Promise<User_Plan[] | []> {
        return await user_plan.find();
    },

     async deleteSubscription(id:number):Promise<void> {
        await user_plan.delete({id});
    }
}
