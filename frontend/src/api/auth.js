import api from '@/api/axiosInstance';

export const fetchUser = async () => {
    const res = await api.get('/user/me', {});
    return res.data;
};

export const signupUser = async (email, password) => {
    const res = await api.post('/auth/signup', { email, password });
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await api.post('/auth/signin', { email, password });
    return res.data;
};

export const logoutUser = async () => {
    await api.post('/auth/signout');
};
