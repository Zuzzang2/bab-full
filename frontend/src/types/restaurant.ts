export type RestaurantResponse = {
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
  includedLists?: IncludedList[];
};

export type IncludedList = {
  listId: number;
  listTitle: string;
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
  data: RestaurantResponse[];
  listId?: number | null;
};

export type SearchRestaurantResponse = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: RestaurantResponse[];
};

export type FetchMyRestaurantsParams = {
  page: number;
  sort?: string;
  title?: string;
};

export type FetchMyListRestaurantsParams = {
  listId: number;
  page?: number;
  sort?: string;
  title?: string;
};

export type CreateRestaurantListDto = {
  title: string;
  description?: string;
};

export type RestaurantList = {
  id: number;
  title: string;
  description: string;
};
