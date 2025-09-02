import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function MyList() {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);

    const fetchRestaurants = async (pageNumber) => {
        try {
            const res = await api.get('/restaurants', {
                params: { page: pageNumber },
            });

            const { total, page: currentPage, pageSize, data } = res.data;

            console.log('총 개수:', total);
            console.log('현재 페이지:', currentPage);
            console.log('페이지당 개수:', pageSize);
            console.log('맛집 목록:', data);

            setRestaurants((prev) => [...prev, ...data]);

            const isLastPage =
                data.length < pageSize || currentPage * pageSize >= total;
            if (isLastPage) {
                setHasMore(false);
            }
        } catch (err) {
            console.error(err);
            setError('맛집 목록을 불러오는 데 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchRestaurants(page);
    }, [page]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">내 맛집 목록</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-2">
                {restaurants.map((r) => (
                    <li key={r.id} className="p-2 border rounded">
                        <p className="font-semibold">{r.title}</p>
                        <p className="text-sm text-gray-500">{r.roadAddress}</p>
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    className="mt-4 w-full bg-gray-200 py-2 rounded"
                >
                    더보기
                </button>
            )}
        </div>
    );
}

export default MyList;
