import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function NavBar() {
    // 로컬 상태 대신 Context에서 상태 가져오도록 수정
    const { user, logout } = useAuth(); // Context에서 상태 가져옴
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(); // Context의 logout 함수 사용
        navigate('/');
    };

    return (
        <nav className="w-full border-b bg-white">
            <div className="max-w-screen-xl mx-auto h-16 flex items-center justify-between px-6">
                <div className="flex gap-4">
                    <span className="font-bold">로고</span>
                    <a href="/">Home</a>
                </div>
                {user ? (
                    <button onClick={handleLogout} className="text-red-500">
                        로그아웃
                    </button>
                ) : (
                    <a href="/login" className="text-blue-500">
                        로그인
                    </a>
                )}
            </div>
        </nav>
    );
}
