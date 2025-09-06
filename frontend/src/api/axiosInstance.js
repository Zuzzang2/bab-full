import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    withCredentials: true, // 쿠키 항상 포함되도록 설정
});

export default instance;
