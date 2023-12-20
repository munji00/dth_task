import { Package } from "../entities/Package.entity"
import { AppDataSource } from "../data-source"

const pack = AppDataSource.getRepository(Package)

export const packageServices = {
   async createPack(packageData:Partial<Package>): Promise<Package> {
        const newPackage = await pack.create(packageData);
        const savedPackage = await pack.save(newPackage);
        return savedPackage;
    },

    async getPack(id:number): Promise<Package | null> {
        return await pack.findOne({where:{id}, relations:{channels:true}});
    },

    async getPackes():Promise<Package[]> {
        return await pack.find({relations:{channels:true}});
    },

    async deletePackage(id:number):Promise<void>{
        await pack.delete({id})
    }
}