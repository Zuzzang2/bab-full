import api from './axiosInstance';

export const fetchRestaurantDetailById = async (id) => {
    try {
        const res = await api.get(`/restaurants/${id}`);
        return res.data;
    } catch (err) {
        console.error('맛집 상세 정보를 가져오는 데 실패했습니다.', err);
        throw err;
    }
};
