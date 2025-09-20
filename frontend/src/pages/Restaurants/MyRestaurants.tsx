import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    fetchMyRestaurants,
    deleteMyRestaurantById,
    fetchMyLists,
    fetchMyListRestaurants,
    deleteRestaurantFromList,
    createMyRestaurantToList,
} from '@/api/restaurant';
import {
    RestaurantResponse,
    RestaurantList,
    RestaurantListResponse,
} from '@/types/restaurant';
import RestaurantItem from '@/components/RestaurantItem';

type SortType = 'latest' | 'oldest' | 'title';

function MyRestaurants() {
    const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [sort, setSort] = useState<SortType>('latest');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [myLists, setMyLists] = useState<RestaurantList[]>([]);
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const [selectedListTitle, setSelectedListTitle] = useState<string | null>(
        null,
    );

    // 리스트 목록 가져오기 (최초 1회)
    useEffect(() => {
        const loadLists = async () => {
            try {
                const data = await fetchMyLists();
                setMyLists(data);
            } catch (err) {
                console.error('리스트 가져오기 실패', err);
            }
        };
        loadLists();
    }, []);

    // 정렬/검색이 바뀌면 목록 초기화
    useEffect(() => {
        resetRestaurants();
    }, [sort, searchTerm, selectedListId]);

    // 페이지 변경 시, 해당 조건으로 맛집 목록 로드
    useEffect(() => {
        if (!hasMore) return;
        loadRestaurants(page, sort, searchTerm, selectedListId);
    }, [page, sort, searchTerm, selectedListId]);

    const resetRestaurants = () => {
        setRestaurants([]);
        setPage(1);
        setHasMore(true);
    };

    // 드롭다운 리스트 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value ? Number(e.target.value) : null;
        const title = e.target.selectedOptions[0]?.text || null;

        setSelectedListId(id);
        setSelectedListTitle(title);
        resetRestaurants();
    };

    const handleDelete = async (restaurantId: number) => {
        const contextMessage = selectedListTitle
            ? `'${selectedListTitle}' 리스트에서 삭제하시겠습니까?`
            : '전체 목록에서 삭제하시겠습니까?';

        const confirmDelete = window.confirm(contextMessage);
        if (!confirmDelete) return;

        try {
            let data: { message: string };

            if (selectedListId) {
                data = await deleteRestaurantFromList(
                    restaurantId,
                    selectedListId,
                );
            } else {
                data = await deleteMyRestaurantById(restaurantId);
            }

            alert(data.message);
            setRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
        } catch (err) {
            console.error(err);
            alert('삭제에 실패했습니다.');
        }
    };

    const handlePost = async (restaurantId: number) => {
        const contextMessage = `'${selectedListTitle}' 리스트에 추가하시겠습니까?`;

        const confirmPost = window.confirm(contextMessage);
        if (!confirmPost) return;

        try {
            if (selectedListId !== null) {
                await createMyRestaurantToList(selectedListId, restaurantId);
                alert('리스트에 성공적으로 추가되었습니다.');
            } else {
                alert('리스트가 선택되지 않았습니다.');
            }
        } catch (error) {
            console.error('리스트 추가 실패:', error);
            alert('리스트 추가에 실패했습니다.');
        }
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value as SortType);
    };

    const loadRestaurants = async (
        pageNumber: number,
        sortParam: string,
        title: string,
        listId?: number | null,
    ) => {
        try {
            let res: RestaurantListResponse;

            if (listId) {
                // 특정 리스트에 속한 맛집 목록 조회
                res = await fetchMyListRestaurants({
                    listId,
                    page: pageNumber,
                    sort: sortParam,
                    title,
                });
            } else {
                // 전체 맛집 목록 조회
                res = await fetchMyRestaurants({
                    page: pageNumber,
                    sort: sortParam,
                    title,
                });
            }
            const { total, page, pageSize, data } = res;
            console.log('맛집 목록:', data);

            setRestaurants((prev) => [...prev, ...data]);

            const isLastPage =
                data.length < pageSize || page * pageSize >= total;
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
            <h2 className="text-xl font-bold mb-4">내가 저장한 전체 맛집</h2>

            {/* 리스트 드롭다운 */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">나의 리스트:</label>
                <select
                    value={selectedListId ?? ''}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                >
                    {/* 전체 목록 보기 옵션 */}
                    <option value="">전체 맛집 목록</option>

                    {/* 리스트가 있다면 */}
                    {myLists.length > 0 ? (
                        myLists.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.title}
                            </option>
                        ))
                    ) : (
                        // 리스트 없을 때는 안내 메시지
                        <option value="" disabled>
                            등록된 리스트가 없습니다
                        </option>
                    )}
                </select>
            </div>

            {/* 검색 및 정렬 */}
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

            {/* 맛집 목록 */}
            <ul className="space-y-2">
                {restaurants.map((restaurant) => (
                    <RestaurantItem
                        key={restaurant.id}
                        id={restaurant.id}
                        title={restaurant.title}
                        address={restaurant.address}
                        includedLists={restaurant.includedLists}
                        onDelete={handleDelete}
                        onPost={handlePost}
                    />
                ))}
            </ul>

            {/* 더보기 버튼 */}
            {hasMore && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        더 보기
                    </button>
                </div>
            )}

            {/* 에러 메시지 */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}

export default MyRestaurants;
