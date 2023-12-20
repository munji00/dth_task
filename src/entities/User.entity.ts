import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { User_Plan } from './User_Plan.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role!:number;

  @Column()
  active!: boolean;

  @OneToMany(()=> User_Plan, (user_plan)=> user_plan.user, { cascade:true})
  user_plan!: User_Plan[];

}
