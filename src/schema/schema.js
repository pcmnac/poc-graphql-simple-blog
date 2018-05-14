import { buildSchema } from 'graphql';

export default buildSchema(`
    type Query {
        hello: String
        posts: [Post]
        post(id: Int!): Post
        users: [User]
    }

    type Post {
        id: Int!
        title: String!
        body: String!
        author: User
        comments: [Comment]
    }

    type Comment {
        id: Int!
        post: Post
        name: String!
        body: String!
        email: String
    }

    type User {
        id: Int!
        name: String!
        username: String!
        email: String
        address: Address
        posts: [Post]
    }

    type Address {
        street: String
        suite: String
        city: String
        zipcode: String
        geo: Geo
    }

    type Geo {
        lat: Float
        lng: Float
    }
`);