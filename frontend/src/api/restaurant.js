import api from '@/api/axiosInstance';

export const fetchMyRestaurants = async () => {
    const res = await api.get('/restaurants');
    return res.data.data;
};

export const fetchRestaurants = async ({ page, sort, title }) => {
    const res = await api.get('/restaurants', {
        params: { page, sort, title },
    });
    return res.data; // { total, page, pageSize, data }
};

export const searchRestaurants = async (title) => {
    const res = await api.get('/restaurants/search', {
        params: { title },
    });
    return res.data.items || [];
};

export const fetchRestaurantDetailById = async (id) => {
    const res = await api.get(`/restaurants/${id}`);
    return res.data;
};

export const deleteRestaurantById = async (id) => {
    const res = await api.delete(`/restaurants/delete/${id}`);
    return res.data;
};

export const addRestaurant = async (payload) => {
    await api.post('/restaurants', payload);
};
