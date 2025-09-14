import { useNavigate } from 'react-router-dom';

type Page = {
    title: string;
    path: string;
};

function Home() {
    const navigate = useNavigate();

    const pages: Page[] = [
        { title: '저장된 전체 맛집 목록', path: '/my-restaurants' },
        { title: '회원가입', path: '/signup' },
        { title: '로그인', path: '/login' },
        { title: '맛집 검색', path: '/search' },
        { title: '나의 리스트 만들기', path: '/create-list' },
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-4 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl p-6">
                {pages.map((page) => (
                    <div
                        key={page.path}
                        className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg p-6 cursor-pointer transition"
                        onClick={() => navigate(page.path)}
                    >
                        <h2 className="text-lg font-bold text-gray-800 text-center">
                            {page.title}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
