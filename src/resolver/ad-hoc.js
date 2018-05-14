
import axios from '../util/axios';

const rootValue = {
    hello: () => 'Hello GraphQL',
    posts: () => axios.get(`http://jsonplaceholder.typicode.com/posts`)
        .then(({ data }) => data.map(post => ({
            ...post,
            // post author
            author: () => axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`).then(({ data }) => data),
            // post comments
            comments: () => axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then(({ data }) => data)
                // .then(({ data }) => data.map(comment => ({
                //     ...comment,
                //     author: () => axios.get(`http://jsonplaceholder.typicode.com/users?email=${comment.email}`).then(({ data }) => data ? data[0] : null),
                // })))
        }))),
    post: ({ id }) => axios.get(`http://jsonplaceholder.typicode.com/posts/${id || ''}`)
        .then(({ data:post }) => ({
            ...post,
            // post author
            author: () => axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`).then(({ data }) => data),
            // post comments
            comments: () => axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then(({ data }) => data)
                // .then(({ data }) => data.map(comment => ({
                //     ...comment,
                //     author: () => axios.get(`http://jsonplaceholder.typicode.com/users?email=${comment.email}`).then(({ data }) => data ? data[0] : null),
                // })))
        })),
};

export default rootValue;