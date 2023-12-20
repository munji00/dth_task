import { Channel } from "../entities/Channel.entity"
import { AppDataSource } from "../data-source"

const channel = AppDataSource.getRepository(Channel)

export const channelServices = {
   async createChannel(channelData:Partial<Channel>): Promise<Channel> {
        const newChannel = await channel.create(channelData);
        const savedChannel = await channel.save(newChannel);
        return savedChannel;
    },

    async getChannel(id:number): Promise<Channel| null> {
        return await channel.findOne({where:{id}});
    },

    async getChannels():Promise<Channel[] | []> {
        return await channel.find();
    },

    async deleteChannel(id:number):Promise<void>{
        await channel.delete({id})
    }
}