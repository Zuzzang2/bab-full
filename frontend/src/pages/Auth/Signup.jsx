import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '@/api/auth';

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const data = await signupUser(email, password);
            alert(data.message);
            navigate('/');
        } catch (err) {
            setError('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}
