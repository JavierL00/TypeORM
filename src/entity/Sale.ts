import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

import { User } from "./User";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity()
export class Sale extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int)
    @ManyToOne(type => User, user => user.sale)
    user!: User;

    @Field(() => Int)
    @ManyToOne(type => Ticket, ticket => ticket.sale)
    ticket!: Ticket;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp"})
    sellDate!: String;
}