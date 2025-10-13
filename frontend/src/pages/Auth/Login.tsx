import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUser, loginUser } from '@/apis/auth';
import { useAuth } from '@/contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user, setUser, isLoading } = useAuth(); // Context에서 상태 가져옴
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      // 유저 세팅은 AuthContext가 담당하므로 여기서는 바로 이동
      navigate('/', { replace: true });
      // 또는 전체 새로고침으로 AuthProvider 강제 재실행
      // window.location.href = '/';
    } catch (err) {
      setError('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/naver`;
  };

  // useEffect(() => {
  //   if (!isLoading && user && location.pathname === '/login') {
  //     alert('이미 로그인 된 상태입니다.');

  //     // 이전 페이지가 존재하면 뒤로가기, 아니면 홈으로
  //     if (location.key !== 'default') {
  //       navigate(-1);
  //     } else {
  //       navigate('/');
  //     }
  //   }
  // }, [user, isLoading, navigate, location]);

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

      {/* 소셜 로그인 구역 */}
      <div className="my-6 border-t pt-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border bg-white px-4 py-3 rounded hover:bg-gray-100 transition mb-3"
        >
          <img src="/images/google.png" alt="Google" className="w-5 h-5 mr-2" />
          <span className="text-sm text-gray-700 font-medium">
            Google로 로그인
          </span>
        </button>

        <button
          onClick={handleNaverLogin}
          className="flex items-center justify-center w-full border px-4 py-3 rounded hover:bg-green-100 transition"
        >
          <img src="/images/naver.png" className="w-6 h-6 mr-2" />
          <span className="text-sm text-green-700 font-semibold">
            Naver로 로그인
          </span>
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Login;
