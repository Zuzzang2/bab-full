import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, logoutUser } from '@/api/auth';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (err) {
                console.error('유저 정보를 불러오지 못했습니다:', err);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate('/');
        } catch (err) {
            console.error('로그아웃 실패:', err);
        }
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
