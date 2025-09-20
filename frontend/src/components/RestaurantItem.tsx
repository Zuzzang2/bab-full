import { IncludedList } from '@/types/restaurant';
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
    // const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        navigate(`/restaurants/${id}`);
    };

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
        setShowDropdown(false);
    };
    // const handleConfirmPost = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     onPost(id);
    //     setShowDropdown(false);
    // };

    const handleMouseEnter = () => {
        if (dropdownTimerRef.current) {
            clearTimeout(dropdownTimerRef.current);
        }
    };

    const handleMouseLeave = () => {
        dropdownTimerRef.current = setTimeout(() => {
            setShowDropdown(false);
            setShowSubmenu(false);
        }, 100); // 약간의 여유를 줘서 끊기지 않게
    };

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
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button onClick={handleToggleDropdown} className="p-3">
                        <img
                            src="/images/menu-icon.png"
                            alt="메뉴"
                            className="w-5 h-5 object-contain"
                        />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-8 z-10 w-40 bg-white shadow-md rounded p-2 border text-sm flex">
                            <div className="flex flex-col w-full relative">
                                <button
                                    onMouseEnter={() => setShowSubmenu(true)}
                                    className="w-full text-left text-blue-600 hover:underline"
                                >
                                    리스트에 추가
                                </button>

                                <button
                                    onClick={handleConfirmDelete}
                                    className="w-full text-left text-red-600 hover:underline"
                                >
                                    삭제
                                </button>

                                {/* 서브 메뉴 */}
                                {showSubmenu && (
                                    <div className="absolute left-full top-0 ml-2 w-40 bg-white border rounded shadow z-20">
                                        <ul className="text-sm text-gray-700">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                데이트 맛집
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                야식 리스트
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                가족 외식
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-blue-600">
                                                더보기
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}
