import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMyRestaurantDetailById } from '@/apis/restaurant';
import KakaoMap from '@/components/KakaoMap';
import { RestaurantResponse } from '@/types/restaurant';

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyRestaurantDetailById(Number(id));
        setRestaurant(data);
      } catch (err) {
        setError('맛집 정보를 불러오지 못했습니다.');
      }
    };

    fetchData();
  }, [id]);

  if (!restaurant) return <p>로딩 중...</p>;

  function cutRoadAddress(address: string): string {
    // 1순위: 읍 or 면
    const eupMyeon = address.match(/^(.*?(읍|면))/);
    if (eupMyeon) return eupMyeon[0];

    // 2순위: 구
    const gu = address.match(/^(.*?구)/);
    if (gu) return gu[0];

    // fallback: 전체 주소 그대로
    return address;
  }

  const trimmedAddress = cutRoadAddress(restaurant.roadAddress);
  const keyword = encodeURIComponent(`${restaurant.title} ${trimmedAddress}`);
  const naverMapLink = `https://map.naver.com/v5/search/${keyword}`;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">
          {restaurant.title}
        </h1>
        <p className="text-sm text-gray-500">{restaurant.category}</p>
      </div>
      <KakaoMap lat={restaurant.mapx} lng={restaurant.mapy} />

      <div className="text-gray-700 space-y-1">
        <p>
          <span className="font-medium text-gray-800">도로명 주소:</span>{' '}
          {restaurant.roadAddress}
        </p>
        <p>
          <span className="font-medium text-gray-800">지번 주소:</span>{' '}
          {restaurant.address}
        </p>
      </div>

      {restaurant.link && (
        <a
          href={restaurant.link}
          className="inline-block px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
          target="_blank"
          rel="noreferrer"
        >
          맛집 사이트 방문
        </a>
      )}

      <a
        href={naverMapLink}
        className="inline-block px-4 py-2 text-sm text-green-600 border border-green-600 hover:bg-green-50 rounded-md transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        네이버 지도에서 보기
      </a>
    </div>
  );
}
export default RestaurantDetail;
