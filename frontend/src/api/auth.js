import api from './axiosInstance';

export const fetchUser = async () => {
    try {
        const res = await api.get('/user/me', {});
        return res.data;
    } catch (err) {
        return null;
    }
};

export const signupUser = async (email, password) => {
    try {
        const res = await api.post('/auth/signup', { email, password });
        return res.data;
    } catch (err) {
        console.error('회원가입 요청 실패:', err);
        throw err;
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await api.post('/auth/signin', { email, password });
        return res.data;
    } catch (err) {
        console.error('로그인 요청 실패:', err);
        throw err;
    }
};
