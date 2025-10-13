import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  createMyRestaurant,
  fetchRestaurantsSavedByUserId,
  searchAllRestaurants,
} from '@/apis/restaurant';
import { CreateRestaurantDto, RestaurantResponse } from '@/types/restaurant';

function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('query');
  const [results, setResults] = useState<RestaurantResponse[]>([]);
  const [error, setError] = useState<string>('');
  const [savedroadAddress, setSavedroadAddress] = useState<string[]>([]);

  // 이미 저장된 맛집 확인
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await fetchRestaurantsSavedByUserId();

        const roadAddress = data
          .map((r) => r.roadAddress?.trim())
          .filter(Boolean); // null/undefined 제거

        console.log('roadAddress:', roadAddress);
        setSavedroadAddress(roadAddress);
      } catch (err) {
        console.error(err);
        setError('맛집 조회 실패');
      }
    };

    fetchSaved();
  }, []);

  // 검색 결과 가져오기
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const data = await searchAllRestaurants(query);
        console.log('검색 결과:', data.items);
        setResults(data.items);
      } catch (err) {
        console.error(err);
        setError('검색에 실패했습니다.');
      }
    };

    if (query) fetchResults();
  }, [query]);

  const handleAdd = async (item: RestaurantResponse) => {
    try {
      const cleanTitle = item.title.replace(/<[^>]+>/g, '');
      const payload: CreateRestaurantDto = {
        title: cleanTitle,
        address: item.address,
        roadAddress: item.roadAddress,
        category: item.category,
        description: item.description,
        link: item.link,
        telephone: item.telephone,
        mapx: Number(item.mapx),
        mapy: Number(item.mapy),
      };

      console.log('저장할 데이터:', payload);

      await createMyRestaurant(payload);

      alert(`"${cleanTitle}"이(가) 저장되었습니다.`);
      setSavedroadAddress((prev) => [...prev, item.roadAddress]); // 버튼 전환
    } catch (err: any) {
      console.error('저장 실패:', err);
      alert(`저장에 실패했습니다. (에러코드 ${err.status})`);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🔍 "{query}"에 대한 검색 결과</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4 space-y-2">
        {results.map((r, i) => {
          const roadAddress = r.roadAddress;
          const isSaved = savedroadAddress.includes(roadAddress);

          return (
            <li
              key={i}
              className="border p-4 rounded flex justify-between items-start"
            >
              <div>
                <p
                  className="font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: r.title,
                  }}
                />
                <p className="text-sm text-gray-500">{r.roadAddress}</p>
              </div>

              {isSaved ? (
                <button
                  className="mt-2 px-3 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
                  disabled
                >
                  저장 완료
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(r)}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  추가하기
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
