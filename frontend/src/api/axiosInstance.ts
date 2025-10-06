import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true, // 쿠키 항상 포함되도록 설정
});

export default instance;
