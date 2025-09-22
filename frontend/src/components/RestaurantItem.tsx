import { fetchMyLists, createMyRestaurantToList } from '@/api/restaurant';
import { IncludedList, RestaurantList } from '@/types/restaurant';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RestaurantItemProps {
    id: number;
    title: string;
    address: string;
    includedLists?: IncludedList[];
    onDelete: (id: number) => void;
    onPost: (id: number) => void;
}

export default function RestaurantItem({
    id,
    title,
    address,
    includedLists,
    onDelete,
    onPost,
}: RestaurantItemProps) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const submenuRef = useRef<HTMLDivElement | null>(null);

    const [myLists, setMyLists] = useState<RestaurantList[]>([]);

    const handleClick = () => {
        navigate(`/restaurants/${id}`);
    };

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
        setShowSubmenu(false);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
        setShowDropdown(false);
        setShowSubmenu(false);
    };

    const handleAddToList = async (
        e: React.MouseEvent,
        listId: number,
        listTitle: string,
    ) => {
        e.stopPropagation();
        try {
            await createMyRestaurantToList(listId, id);
            alert(`${listTitle} 리스트에 추가되었습니다.`);
            setShowDropdown(false);
            setShowSubmenu(false);
        } catch (error) {
            const errorData = (error as any).response.data;
            if (errorData?.message) {
                alert(errorData.message);
            } else {
                console.error('리스트 추가 실패:', error);
                alert('리스트 추가에 실패했습니다.');
            }
        }
    };

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

    // 바깥 클릭 시 드롭다운 & 서브모달 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const isInsideDropdown =
                dropdownRef.current && dropdownRef.current.contains(target);
            const isInsideSubmenu =
                submenuRef.current && submenuRef.current.contains(target);

            if (!isInsideDropdown && !isInsideSubmenu) {
                setShowDropdown(false);
                setShowSubmenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <li
            className="relative border p-3 rounded cursor-pointer hover:bg-gray-100"
            onClick={handleClick}
        >
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center flex-wrap gap-2 pb-2">
                        <h3 className="font-semibold">{title}</h3>

                        {includedLists?.map((list) => (
                            <span
                                key={list.listId}
                                className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                            >
                                {list.listTitle}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm text-gray-600">{address}</p>
                </div>

                {/* 메뉴 */}
                <div className="relative">
                    <button onClick={handleToggleDropdown} className="p-3">
                        <img
                            src="/images/menu-icon.png"
                            alt="메뉴"
                            className="w-5 h-5 object-contain"
                        />
                    </button>

                    {showDropdown && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 top-8 z-10 w-40 bg-white shadow-md rounded border text-sm flex"
                        >
                            <div className="flex flex-col w-full relative p-2">
                                {/* 리스트에 추가 버튼 (클릭 시 서브 메뉴 토글) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowSubmenu((prev) => !prev);
                                    }}
                                    className="w-full text-left text-blue-600  hover:underline"
                                >
                                    리스트에 추가
                                </button>

                                {/* 서브 메뉴 */}
                                {showSubmenu && (
                                    <div
                                        ref={submenuRef}
                                        className="absolute left-full top-0 ml-2 w-40 bg-white border rounded shadow z-20"
                                    >
                                        <ul className="text-sm text-gray-700">
                                            {myLists.length > 0 &&
                                                myLists.map((list) => (
                                                    <li
                                                        key={list.id}
                                                        value={list.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={(e) =>
                                                            handleAddToList(
                                                                e,
                                                                list.id,
                                                                list.title,
                                                            )
                                                        }
                                                    >
                                                        {list.title}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}

                                {/* 삭제 버튼 */}
                                <button
                                    onClick={handleConfirmDelete}
                                    className="w-full text-left text-red-600 hover:underline"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}
