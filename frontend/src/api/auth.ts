import api from '@/api/axiosInstance';
import { User, SignResponse } from '@/types/user';

export const fetchUser = async (): Promise<User> => {
    const res = await api.get('/user/me', {});
    return res.data;
};

export const signupUser = async (
    email: string,
    password: string,
): Promise<SignResponse> => {
    const res = await api.post('/auth/signup', { email, password });
    return res.data;
};

export const loginUser = async (
    email: string,
    password: string,
): Promise<SignResponse> => {
    const res = await api.post('/auth/signin', { email, password });
    return res.data;
};

export const logoutUser = async (): Promise<void> => {
    await api.post('/auth/signout');
};
