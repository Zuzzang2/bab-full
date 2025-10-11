// src/pages/CreateList.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMyRestaurantList } from '@/api/restaurant';
import { CreateRestaurantListDto } from '@/types/restaurant';
import { useAuth } from '@/contexts/AuthContext';

function CreateList() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [isLoading, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('리스트 제목을 입력해주세요.');
      return;
    }

    try {
      await createMyRestaurantList({
        title: title.trim(),
        description: description.trim(),
      });
      navigate('/my-restaurants');
    } catch (err) {
      console.error(err);
      setError('리스트 생성에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">나의 리스트 만들기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">리스트 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="예: 데이트용 맛집"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">설명 (선택)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="리스트에 대한 설명을 입력하세요."
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          리스트 생성하기
        </button>
      </form>
    </div>
  );
}

export default CreateList;
