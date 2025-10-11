import api from '@/api/axiosInstance';
import { User } from '@/types/user';

export const fetchUser = async (): Promise<User> => {
  const res = await api.get('/user/me');
  return res.data;
};

export const signupUser = async (
  email: string,
  nickname: string,
  password: string,
): Promise<{ message: string }> => {
  try {
    const res = await api.post('/auth/signup', {
      email,
      nickname,
      password,
    });
    return res.data;
  } catch (err) {
    const errorData = (err as any).response.data;
    // 백엔드로부터 받은 에러 메시지 처리
    if (errorData?.message) {
      if (Array.isArray(errorData.message)) {
        // 배열인 경우
        const errorMessages = errorData.message.join('\n');
        throw new Error(errorMessages);
      } else {
        // 문자열인 경우
        throw new Error(errorData.message);
      }
    }

    // 네트워크 에러나 기타 에러
    throw new Error('회원가입에 실패했습니다.');
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ message: string }> => {
  const res = await api.post('/auth/signin', { email, password });
  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/signout');
};

export const completeGoogleSignup = async (nickname: string) => {
  const res = await api.post('/auth/google/complete', { nickname });
  return res.data;
};

export const updateNickname = async (
  nickname: string,
): Promise<{ message: string }> => {
  const res = await api.patch('/user/nickname', { nickname });
  return res.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.patch('/user/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProfile = async (): Promise<{ message: string }> => {
  const res = await api.delete('/users/me');
  return res.data;
};
