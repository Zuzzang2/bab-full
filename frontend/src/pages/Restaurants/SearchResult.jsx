import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axiosInstance';

function SearchResults() {
    const [params] = useSearchParams();
    const query = params.get('query');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await api.get('/restaurants/search', {
                    params: { title: query },
                });
                console.log('검색 결과:', res.data);
                setResults(res.data.items || []); // 네이버 API 구조
            } catch (err) {
                console.error(err);
                setError('검색에 실패했습니다.');
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">
                🔍 "{query}"에 대한 검색 결과
            </h2>

            {error && <p className="text-red-500">{error}</p>}

            <ul className="mt-4 space-y-2">
                {results.map((r, i) => (
                    <li key={i} className="border p-2 rounded">
                        <p
                            className="font-semibold"
                            dangerouslySetInnerHTML={{ __html: r.title }}
                        />
                        <p className="text-sm text-gray-500">{r.roadAddress}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;
