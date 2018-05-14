
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
        }))),
    post: ({ id }) => axios.get(`http://jsonplaceholder.typicode.com/posts/${id || ''}`)
        .then(({ data:post }) => ({
            ...post,
            // post author
            author: () => axios.get(`http://jsonplaceholder.typicode.com/users/${post.userId}`).then(({ data }) => data),
            // post comments
            comments: () => axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then(({ data }) => data)
        })),
};

export default rootValue;