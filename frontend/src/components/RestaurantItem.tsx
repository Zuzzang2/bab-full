import { useNavigate } from 'react-router-dom';

interface RestaurantItemProps {
    id: number;
    title: string;
    address: string;
    onDelete: (id: number) => void;
}

export default function RestaurantItem({
    id,
    title,
    address,
    onDelete,
}: RestaurantItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurants/${id}`);
    };

    return (
        <li
            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={handleClick}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{address}</p>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 클릭 버블링 막기
                        onDelete(id);
                    }}
                    className="text-red-500 hover:underline"
                >
                    삭제
                </button>
            </div>
        </li>
    );
}
