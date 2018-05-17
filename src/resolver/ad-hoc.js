
import axios from '../util/axios';

const rootValue = {
    hello: () => 'Hello GraphQL',
    posts: () => axios.get(`/posts`)
        .then(({ data }) => data.map(post => ({
            ...post,
            // post author
            author: () => axios.get(`/users/${post.userId}`).then(({ data }) => data),
            // post comments
            comments: () => axios.get(`/comments?postId=${post.id}`).then(({ data }) => data)
        }))),
    post: ({ id }) => axios.get(`/posts/${id || ''}`)
        .then(({ data:post }) => ({
            ...post,
            // post author
            author: () => axios.get(`/users/${post.userId}`).then(({ data }) => data),
            // post comments
            comments: () => axios.get(`/comments?postId=${post.id}`).then(({ data }) => data)
        })),
};

export default rootValue;