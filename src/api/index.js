import { Router } from 'express';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import axios from '../util/axios';
import morgan from 'morgan';
import { version } from '../../package.json';
import schema from '../schema/schema';
import adHocRootResolver from '../resolver/ad-hoc';
import ClassRootResolver from '../resolver/class-resolvers';
import spreadRootResolver from '../resolver/spread-resolvers';
import spreadDataloaderRootResolver from '../resolver/spread-resolvers-dataloader';

const api = Router();

api.get('/', (req, res) => {
    res.json({ version });
});

api.use('/gql', graphqlHTTP({
    schema,
    // rootValue: adHocRootResolver,
    // rootValue: new ClassRootResolver(),
    // rootValue: spreadRootResolver,
    rootValue: spreadDataloaderRootResolver,
    graphiql: true,
}));

export default api;
