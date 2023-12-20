import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { User } from './User.entity';
import { Package } from './Package.entity';

@Entity()
export class User_Plan{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'timestamp', default:null})
  st_date!:Date;

  @Column()
  userId!:number;

  @Column()
  packageId!:number;

  @ManyToOne(()=> User, (user)=> user.user_plan)
  user!:User;

  @ManyToOne(()=> Package, (pkg)=> pkg.user_plan)
  package!:Package;

}
