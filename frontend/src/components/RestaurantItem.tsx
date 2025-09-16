interface RestaurantItemProps {
    id: number;
    title: string;
    address: string;
    onDelete: (id: number) => void;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
    id,
    title,
    address,
    onDelete,
}) => {
    return (
        <li className="border p-2 rounded">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{address}</p>
                </div>
                <button
                    onClick={() => onDelete(id)}
                    className="text-red-500 hover:underline"
                >
                    삭제
                </button>
            </div>
        </li>
    );
};

export default RestaurantItem;
