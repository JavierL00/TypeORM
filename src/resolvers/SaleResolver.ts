import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";
import { Sale } from "../entity/Sale";
import { Ticket } from "../entity/Ticket";
import { User } from "../entity/User";

@InputType()
class SaleInput {
    @Field(() => Int)
    user!: User;

    @Field(() => Int)
    ticket!: Ticket;
}

@InputType()
class SaleUpdateInput {
    @Field()
    user?: User;

    @Field()
    ticket?: Ticket;
}

@Resolver()
export class SaleResolver {
    @Mutation(() => Sale)
    async createSale(
        @Arg("variables", () => SaleInput) variables: SaleInput
    ) {
        const newSale = Sale.create(variables);
        return await newSale.save();
    }

    @Mutation(() => Boolean)
    async deleteSale(
        @Arg("id", () => Int) id: number
    ) {
        await Sale.delete(id);
        return true;
    }

    // ACTUALIZAR

    @Query(() => [Sale])
    sale() {
        return Sale.find();
    }
}