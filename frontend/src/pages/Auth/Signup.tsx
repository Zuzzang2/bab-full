import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signupUser, loginUser, fetchUser } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
  const { user, setUser, isLoading } = useAuth(); // Context에서 상태 가져옴
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 회원가입 후 로그인
      const data = await signupUser(email, nickname, password);
      await loginUser(email, password);

      // 로그인 후 사용자 정보를 백엔드에서 가져와서 Context에 업데이트
      const userData = await fetchUser();
      setUser(userData);

      alert(data.message);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      alert('이미 로그인된 상태입니다.');

      // 이전 페이지가 존재하면 뒤로가기, 아니면 홈으로
      if (location.key !== 'default') {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  }, [user, isLoading, navigate, location]);

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
          type="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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

        {error && <p className="text-red-500 mt-2">{error}</p>}

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
