import { useState } from 'react';
import api from '@/apis/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { completeGoogleSignup } from '@/apis/auth';

export default function SocialSignup() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await completeGoogleSignup(nickname); // nickname만 전달
      alert(res.message);
      navigate('/');
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(typeof msg === 'string' ? msg : '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">소셜 회원가입</h1>
      <p className="text-sm text-gray-600 mb-4">
        사용하실 닉네임을 입력해주세요.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          required
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2"
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
}
