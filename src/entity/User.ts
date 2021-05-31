import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Sale } from "./Sale";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  surname!: string;

  @Field()
  @Column()
  gender!: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  age!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @OneToMany(type => Sale, sale => sale.user)
  sale!: Sale[];
}
