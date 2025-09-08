import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/auth';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);
            alert(data.message);
            navigate('/');
        } catch (err) {
            setError('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20">
            <h2 className="text-xl font-bold mb-4">로그인</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 w-full"
                >
                    로그인
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default Login;
