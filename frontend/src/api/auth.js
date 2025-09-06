import api from './axiosInstance';

export const fetchUser = async () => {
    try {
        const res = await api.get('/user/me', {});
        return res.data; // 로그인 상태
    } catch (err) {
        return null; // 로그인 안됨
    }
};
