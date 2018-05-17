import axios from '../util/axios';

export class Post {
    constructor({
        id,
        title,
        body,
        userId,
    }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.userId = userId;
    };

    author() {
        
        return axios.get(`/users/${this.userId}`)
            .then(({ data }) => new User(data));
    }

    comments() {
        return axios.get(`/comments?postId=${this.id}`)
            .then(({ data }) => data.map(comment => new Comment(comment)))
    }

}

export class Comment {
    constructor({
        id,
        postId,
        name,
        email,
        body,
    }) {
        this.id = id;
        this.postId = postId;
        this.name = name;
        this.email = email;
        this.body = body;
    }
}

export class User {
    constructor({
        id,
        name,
        email,
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    posts() {
        return axios.get(`/posts?userId=${this.id}`)
            .then(({ data }) => data.map(post => new Post(post)))
    }
}

export default class Root {
    hello() {
        return 'Hello GraphQL (class resolvers)';
    } 
    
    posts() {
        return axios.get(`/posts`)
            .then(({ data }) => data.map(post => new Post(post)))
    }

    post({ id }) {
        return axios.get(`/posts/${id}`)
            .then(({ data }) => new Post(data))
    }
}