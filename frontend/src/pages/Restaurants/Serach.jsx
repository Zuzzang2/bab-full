import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/results?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">식당 검색</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="검색어를 입력하세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    검색
                </button>
            </form>
        </div>
    );
}

export default Search;
