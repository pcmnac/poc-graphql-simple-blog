import axios from 'axios';

// Add a request interceptor
let counter = 0;
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(`request ${++counter}:`, config.url);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('Pending requests:', --counter);
    return response;
}, function (error) {
    // Do something with response error
    console.log('[error] Pending requests:', --counter);
    return Promise.reject(error);
});

axios.defaults.baseURL = process.env.API || 'http://jsonplaceholder.typicode.com';

export default axios;