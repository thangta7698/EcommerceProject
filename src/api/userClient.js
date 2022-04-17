import axios from 'axios';
import { STATIC_HOST } from '../constants/common';
const userClient = axios.create({
    baseURL: `${STATIC_HOST}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ''
    },
});
userClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
userClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;

}, function (error) {
    console.log("ERROR", error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default userClient;
