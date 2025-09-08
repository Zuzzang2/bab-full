export type Restaurant = {
    id: number;
    title: string;
    address: string;
    roadAddress: string;
    category?: string;
    description?: string;
    link?: string;
    telephone?: string;
    mapx: string;
    mapy: string;
};

export type CreateRestaurantDto = {
    title: string;
    address: string;
    roadAddress: string;
    category?: string;
    description?: string;
    link?: string;
    telephone?: string;
    mapx: number;
    mapy: number;
};

export type RestaurantListResponse = {
    total: number;
    page: number;
    pageSize: number;
    data: Restaurant[];
};

export type SearchRestaurantResponse = {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: Restaurant[];
};
