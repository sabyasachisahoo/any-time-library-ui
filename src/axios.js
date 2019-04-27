import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;