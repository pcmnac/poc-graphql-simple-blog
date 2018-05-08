GraphQL - Simple Blog API
==================================

This is a PoC of a simple blog GraphQL API. I used http://jsonplaceholder.typicode.com to simulate the datastore.

**Evaluated features**:
 - GraphQL Schema language
 - Resolver aproaches
   - Ad-hoc resolvers
   - Class-based resolvers
   - Object factories (compacted reusable resolvers built by using object spread)
 - Dataloader


Sample Queries
--------------

```graphql
query getPosts {
  hello,
  post(id: 3) {
    id
    title
    body
    author {
      name
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
    }
    comments {
      name
      email
    	post {
    	  id
    	}
      author {
        name
      }
    }
  }
}


query getUsers {
  hello,
  users {
    id
    name
    nombre:name
    username
    posts {
      id
      title
      author {
        id
        name
      }
    }
  }
}
```


Getting Started
---------------

```sh
# clone it
git clone https://github.com/pcmnac/poc-graphql-simple-blog.git
cd poc-graphql-simple-blog

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm i

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

> access http://localhost:8080/gpl/graphql

License
-------

MIT
