import api from '@/api/axiosInstance';
import {
    CreateRestaurantDto,
    Restaurant,
    RestaurantListResponse,
    SearchRestaurantResponse,
} from '@/types/restaurant';

// 내 계정에 저장된 맛집 조회 (검색 시 중복 확인용)
export const fetchMyRestaurants = async (): Promise<Restaurant[]> => {
    const res = await api.get('/restaurants');
    return res.data.data;
};

// 전체 맛집 리스트 조회 (페이지네이션/검색/정렬)
export const fetchRestaurants = async ({
    page,
    sort,
    title,
}: {
    page: number;
    sort?: string;
    title?: string;
}): Promise<RestaurantListResponse> => {
    const res = await api.get<RestaurantListResponse>('/restaurants', {
        params: { page, sort, title },
    });
    return res.data;
};

// 전체 맛집 검색
export const searchRestaurants = async (
    title: string,
): Promise<SearchRestaurantResponse> => {
    const res = await api.get('/restaurants/search', {
        params: { title },
    });
    return res.data.items;
};

// 맛집 상세 정보
export const fetchRestaurantDetailById = async (
    id: number,
): Promise<Restaurant> => {
    const res = await api.get(`/restaurants/${id}`);
    return res.data;
};

// 맛집 삭제
export const deleteRestaurantById = async (
    id: number,
): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(
        `/restaurants/delete/${id}`,
    );
    return res.data;
};

// 맛집 추가
export const addRestaurant = async (
    payload: CreateRestaurantDto,
): Promise<void> => {
    await api.post('/restaurants', payload);
};
