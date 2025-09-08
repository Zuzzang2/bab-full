import api from './axiosInstance';

export const fetchMyRestaurants = async () => {
    try {
        const res = await api.get('/restaurants');
        return res.data.data;
    } catch (err) {
        console.error('저장된 맛집 조회 실패:', err);
        throw err;
    }
};

export const fetchRestaurants = async ({ page, sort, title }) => {
    try {
        const res = await api.get('/restaurants', {
            params: { page, sort, title },
        });
        return res.data; // { total, page, pageSize, data }
    } catch {
        console.error('내가 추가한 맛집 조회 실패:', err);
        throw err;
    }
};

export const searchRestaurants = async (title) => {
    try {
        const res = await api.get('/restaurants/search', {
            params: { title },
        });
        return res.data.items || [];
    } catch (err) {
        console.error('맛집 검색 실패:', err);
        throw err;
    }
};

export const fetchRestaurantDetailById = async (id) => {
    try {
        const res = await api.get(`/restaurants/${id}`);
        return res.data;
    } catch (err) {
        console.error('맛집 상세 정보를 가져오는 데 실패했습니다.', err);
        throw err;
    }
};

export const deleteRestaurantById = async (id) => {
    try {
        const res = await api.delete(`/restaurants/delete/${id}`);
        return res.data;
    } catch (err) {
        console.error('맛집 삭제에 실패했습니다.', err);
        throw err;
    }
};
