import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';

function MyList() {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('latest');
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setRestaurants([]);
        setPage(1);
        setHasMore(true);
    }, [sort, searchTerm]);

    useEffect(() => {
        fetchRestaurants(page, sort, searchTerm);
    }, [page, sort, searchTerm]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            const res = await api.delete(`/restaurants/delete/${id}`);
            alert(res.data.message);
            setRestaurants((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error(err);
            alert('삭제에 실패했습니다.');
        }
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const fetchRestaurants = async (pageNumber, sortParam, title) => {
        try {
            const res = await api.get('/restaurants', {
                params: { page: pageNumber, sort: sortParam, title: title },
            });

            const { total, page: currentPage, pageSize, data } = res.data;
            console.log(res.data);

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

            <div className="mb-4 flex items-center gap-4">
                {/* 검색 */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearchTerm(inputValue);
                            }
                        }}
                        placeholder="맛집 이름 검색"
                        className="border rounded px-2 py-1"
                    />
                    <button
                        onClick={() => setSearchTerm(inputValue)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        검색
                    </button>
                </div>

                {/* 정렬 */}
                <div className="flex items-center">
                    <label className="mr-2 font-semibold">정렬:</label>
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
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {restaurants.length === 0 && !hasMore ? (
                <p className="text-gray-500 text-center mt-8">
                    검색 결과가 없습니다.
                </p>
            ) : (
                <ul className="space-y-2">
                    {restaurants.map((r) => (
                        <li
                            key={r.id}
                            className="p-2 border rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{r.title}</p>
                                <p className="text-sm text-gray-500">
                                    {r.roadAddress}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(r.id)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}

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
