import { useEffect, useRef } from 'react';

interface Props {
    onAddToList: () => void;
    onDeleteClick: () => void;
    onClose: () => void;
}

export default function RestaurantItemDropdown({
    onAddToList,
    onDeleteClick,
    onClose,
}: Props) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-8 z-50 bg-white border rounded shadow-md w-40"
        >
            <button
                onClick={() => {
                    onAddToList();
                    onClose();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
                리스트에 추가
            </button>
            <button
                onClick={() => {
                    onDeleteClick();
                    onClose();
                }}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
                삭제
            </button>
        </div>
    );
}
