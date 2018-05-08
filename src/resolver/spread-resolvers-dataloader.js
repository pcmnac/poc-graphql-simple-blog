import DataLoader from 'dataloader';
import axios from '../util/axios';

// loaders

const fetchUsers = keys => {
    console.log('loading users: ', keys);
    return Promise.all(keys.map(id => axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
        .then(({ data }) => User(data)).catch(() => null)));
};

const fetchPosts = keys => {
    console.log('loading posts: ', keys);
    return Promise.all(keys.map(id => axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
        .then(({ data }) => Post(data)).catch(() => null)));
};

const fetchPostsByUser = keys => {
    console.log('loading posts from users: ', keys);
    return Promise.all(keys.map(id => axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(({ data }) => data.map(Post)).catch(() => null)));
};

const fetchCommentsByPost = keys => {
    console.log('loading comments from posts: ', keys);
    return Promise.all(keys.map(id => axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(({ data }) => data.map(Comment)).catch(() => null)));
};

const userLoad = new DataLoader(fetchUsers);
const postLoad = new DataLoader(fetchPosts);
const postsByUserLoad = new DataLoader(fetchPostsByUser);
const commentsByPostLoad = new DataLoader(fetchCommentsByPost);

// resolvers

export const Post = data => ({
    ...data,
    author: () => userLoad.load(data.userId),
    comments: () => commentsByPostLoad.load(data.id),
});

export const Comment = data => ({
    ...data,
    post: () => postLoad.load(data.postId),
});

export const User = data => ({
    ...data,
    posts: postsByUserLoad.load(data.id),
});

export default {
    hello: () => 'Hello GraphQL (spread resolvers + data loader)',

    posts: () => axios.get(`http://jsonplaceholder.typicode.com/posts`)
        .then(({ data }) => data.map(Post)),

    post: ({ id }) => postLoad.load(id),

    users: () => axios.get(`http://jsonplaceholder.typicode.com/users`)
        .then(({ data }) => data.map(User)),
}