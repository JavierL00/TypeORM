import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { Destination } from "../entity/Destination";

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int)
    @ManyToOne(type => Destination, destination => destination.ticket)
    destination!: Destination;

    @Field(() => Int)
    @Column("int", { default: 0 })
    price!: number;

    @Field(() => Int)
    @Column("int", { default: 0 })
    duration!: number;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;
}