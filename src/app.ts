import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/UserResolver";
import { DestinationResolver } from "./resolvers/DestinationResolver";
import { TicketResolver } from "./resolvers/TicketResolver";

export async function startServer() {

    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, DestinationResolver, TicketResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, path: '/graphql' })

    return app;
}