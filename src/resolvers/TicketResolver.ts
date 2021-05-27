import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Destination } from "../entity/Destination";
import { Ticket } from "../entity/Ticket";

@InputType()
class TicketInput {
  @Field(() => Int)
  destination!: Destination;

  @Field(() => Int)
  price!: number;

  @Field(() => Int)
  duration!: number;
}

@InputType()
class TicketUpdateInput {
  @Field()
  destination?: number;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  duration?: number;
}

@Resolver()
export class TicketResolver {
  @Mutation(() => Ticket)
  async createTicket(
    @Arg("variables", () => TicketInput) variables: TicketInput
  ) {
    const newTicket = Ticket.create(variables);
    return await newTicket.save();
  }

  @Mutation(() => Boolean)
  async deleteTicket(@Arg("id", () => Int) id: number) {
    await Ticket.delete(id);
    return true;
  }

  /*@Mutation(() => Boolean)
  async updateTicket(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => TicketUpdateInput) fields: TicketUpdateInput
  ) {
    await Ticket.update({ id }, fields);
    return true;
  }*/

  @Query(() => [Ticket])
  ticket() {
    return Ticket.find();
  }
}