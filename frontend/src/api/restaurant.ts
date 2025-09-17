import api from '@/api/axiosInstance';
import {
    CreateRestaurantDto,
    Restaurant,
    RestaurantListResponse,
    SearchRestaurantResponse,
    FetchMyRestaurantsParams,
    FetchMyListRestaurantsParams,
    CreateRestaurantListDto,
    RestaurantList,
} from '@/types/restaurant';

// 내가 저장한 전체 맛집 목록 조회 (페이지네이션/검색/정렬)
export const fetchMyRestaurants = async ({
    page,
    sort,
    title,
}: FetchMyRestaurantsParams): Promise<RestaurantListResponse> => {
    const res = await api.get<RestaurantListResponse>('/restaurants', {
        params: { page, sort, title },
    });
    return res.data;
};

// 특정 리스트의 맛집 목록 조회
export const fetchMyListRestaurants = async ({
    listId,
    page = 1,
    sort = 'latest',
    title,
}: FetchMyListRestaurantsParams): Promise<RestaurantListResponse> => {
    const res = await api.get<RestaurantListResponse>(
        `/restaurants/list/${listId}`,
        {
            params: {
                page,
                sort,
                ...(title && { title }),
            },
        },
    );
    return res.data;
};

// 내 리스트 전체
export const fetchMyLists = async (): Promise<RestaurantList[]> => {
    const res = await api.get('/restaurants/list');
    return res.data.data;
};

// 모든 맛집 검색
export const searchAllRestaurants = async (
    title: string,
): Promise<SearchRestaurantResponse> => {
    const res = await api.get('/restaurants/search', {
        params: { title },
    });
    return res.data;
};

// 검색 시 전체 맛집 목록에서 중복 확인
export const fetchRestaurantsSavedByUserId = async (): Promise<
    Restaurant[]
> => {
    const res = await api.get('/restaurants/check-duplicate');
    return res.data;
};

// 내가 저장한 맛집 상세 정보
export const fetchMyRestaurantDetailById = async (
    id: number,
): Promise<Restaurant> => {
    const res = await api.get(`/restaurants/${id}`);
    return res.data;
};

// 저장된 전체 맛집 목록 중 특정 맛집 삭제
export const deleteMyRestaurantById = async (
    restaurantId: number,
): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(
        `/restaurants/${restaurantId}`,
    );
    return res.data;
};

// 특정 리스트의 맛집 목록 중 특정 맛집 삭제
export const deleteRestaurantFromList = async (
    restaurantId: number,
    listId: number,
): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(
        `/restaurants/${restaurantId}/list/${listId}`,
    );
    return res.data;
};

// 전체 맛집 목록에 맛집 추가
export const createMyRestaurant = async (
    payload: CreateRestaurantDto,
): Promise<void> => {
    await api.post('/restaurants', payload);
};

// 특정 리스트에 맛집 추가
export const createMyRestaurantToList = async (
    listId: number,
    payload: CreateRestaurantDto,
): Promise<void> => {
    await api.post(`/restaurants/list/${listId}`, payload);
};

// 리스트 생성
export const createMyRestaurantList = async (
    payload: CreateRestaurantListDto,
): Promise<void> => {
    await api.post('/restaurants/list', payload);
};
