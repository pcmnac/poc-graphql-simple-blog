GraphQL Simple Blog
==================================

Sample Queries

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
