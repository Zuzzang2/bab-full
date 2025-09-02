import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function MyList() {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('latest');

    useEffect(() => {
        setRestaurants([]);
        setPage(1);
        setHasMore(true);
    }, [sort]);

    useEffect(() => {
        fetchRestaurants(page, sort);
    }, [page, sort]);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const fetchRestaurants = async (pageNumber, sortParam) => {
        try {
            const res = await api.get('/restaurants', {
                params: { page: pageNumber, sort: sortParam },
            });

            const {
                total,
                page: currentPage,
                pageSize,
                data,
                sort: returnedSort,
            } = res.data;

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

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">내 맛집 리스트</h2>
            <div className="mb-4">
                <label className="mr-2 font-semibold">정렬: </label>
                <select
                    value={sort}
                    onChange={handleSortChange}
                    className="border rounded px-2 py-1"
                >
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                    <option value="title">이름순</option>
                </select>
            </div>
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
