import axios from '../util/axios';

export const Post = data => ({
    ...data,

    author: () => axios.get(`/users/${data.userId}`)
        .then(({ data }) => User(data)),

    comments: () => axios.get(`/comments?postId=${data.id}`)
        .then(({ data }) => data.map(Comment)),
});

export const Comment = data => ({
    ...data,

    post: () => axios.get(`/posts/${data.postId}`)
        .then(({ data }) => Post(data)),
});

export const User = data => ({
    ...data,
    posts: () => axios.get(`/posts?userId=${data.id}`)
        .then(({ data }) => data.map(Post)),
});

export default {
    hello: () => 'Hello GraphQL (spread resolvers)',
    
    posts: () => axios.get(`/posts`)
        .then(({ data }) => data.map(Post)),

    post: ({ id }) => axios.get(`/posts/${id}`)
        .then(({ data }) => Post(data)),

    users: () => axios.get(`/users`)
        .then(({ data }) => data.map(User)),
}