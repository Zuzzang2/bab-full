import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RestaurantItemProps {
    id: number;
    title: string;
    address: string;
    includedLists?: {
        listId: number;
        listTitle: string;
    };
    onDelete: (id: number) => void;
}

export default function RestaurantItem({
    id,
    title,
    address,
    includedLists = [],
    onDelete,
}: RestaurantItemProps) {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
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
                    <h3 className="font-semibold pb-2">{title}</h3>
                    <p className="text-sm text-gray-500">
                        {includedLists
                            ?.map((list) => list.listTitle)
                            .join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">{address}</p>
                </div>

                {/* 삭제 버튼 (드롭다운 열기용) */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={handleToggleDropdown}
                        className="w-5 h-5 m-3"
                    >
                        <img
                            src="/images/menu-icon.png"
                            alt="삭제"
                            className="w-full h-full object-contain "
                        />
                    </button>

                    {/* 드롭다운 모달 */}
                    {showDropdown && (
                        <div className="absolute right-0 top-8 z-10 w-40 bg-white shadow-md rounded p-2 border text-sm">
                            <button
                                onClick={handleConfirmDelete}
                                className="w-full text-left text-red-600 hover:underline"
                            >
                                삭제하기
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left mt-1 text-gray-500 hover:underline"
                            >
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}
