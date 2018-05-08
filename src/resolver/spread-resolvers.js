import axios from '../util/axios';

export const Post = data => ({
    ...data,

    author: () => axios.get(`http://jsonplaceholder.typicode.com/users/${data.userId}`)
        .then(({ data }) => User(data)),

    comments: () => axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${data.id}`)
        .then(({ data }) => data.map(Comment)),
});

export const Comment = data => ({
    ...data,

    post: () => axios.get(`http://jsonplaceholder.typicode.com/posts/${data.postId}`)
        .then(({ data }) => Post(data)),
});

export const User = data => ({
    ...data,
    posts: () => axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${data.id}`)
        .then(({ data }) => data.map(Post)),
});

export default {
    hello: () => 'Hello GraphQL (spread resolvers)',
    
    posts: () => axios.get(`http://jsonplaceholder.typicode.com/posts`)
        .then(({ data }) => data.map(Post)),

    post: ({ id }) => axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
        .then(({ data }) => Post(data)),

    users: () => axios.get(`http://jsonplaceholder.typicode.com/users`)
        .then(({ data }) => data.map(User)),
}