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
  
  @InputType()
  class DestinationInput {
    @Field()
    name!: string;
  
    @Field()
    description!: string;
  }
  
  @InputType()
  class DestinationUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;
  
    @Field(() => String, {nullable: true})
    description?: string;
  }
  
  @Resolver()
  export class DestinationResolver {
    @Mutation(() => Destination)
    async createDestination(
      @Arg("variables", () => DestinationInput) variables: DestinationInput
    ) {
      const newDestination = Destination.create(variables);
      return await newDestination.save();
    }
  
    @Mutation(() => Boolean)
    async deleteDestination(@Arg("id", () => Int) id: number) {
      await Destination.delete(id);
      return true;
    }
  
    @Mutation(() => Boolean)
    async updateDestination(
      @Arg("id", () => Int) id: number,
      @Arg("fields", () => DestinationUpdateInput) fields: DestinationUpdateInput
    ) {
      await Destination.update({ id }, fields);
      return true;
    }
  
    @Query(() => [Destination])
    destination() {
      return Destination.find();
    }
  }
  