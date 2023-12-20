import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Package } from './Package.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  description!: string;

  @ManyToOne(()=> Package, (pack)=> pack.channels)
  pack!:Package;

}
