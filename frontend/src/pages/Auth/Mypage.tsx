import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchUser,
  updateNickname,
  uploadProfileImage,
  deleteProfile,
} from '@/api/auth';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const { user, setUser } = useAuth();
  const [nickname, setNickname] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchUser();
      setUser(data);
      setNickname(data.nickname || '');
      setPreview(data.profileImageUrl || null);
    };

    loadProfile();
  }, [setUser]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleNicknameUpdate = async () => {
    try {
      const res = await updateNickname(nickname);
      alert(res.message);
    } catch (err: any) {
      console.log(err);
      alert(err?.response?.data?.message || '닉네임 변경에 실패했습니다.');
    }
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selected = e.target.files?.[0];
  //   if (selected) {
  //     setFile(selected);
  //     setPreview(URL.createObjectURL(selected));
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (!file) return alert('이미지를 선택해주세요.');
    try {
      const res = await uploadProfileImage(file);
      alert(res.message);
    } catch (err) {
      console.log(err);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'))
      return;
    try {
      const res = await deleteProfile();
      alert(res.message);
      navigate('/login');
    } catch (err) {
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">마이페이지</h2>

      <div className="flex flex-col items-center mb-6">
        <div
          className="relative group w-32 h-32 rounded-full overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={preview || '/images/default-profile.png'}
            alt="프로필"
            className="w-full h-full object-cover"
          />
          {/* Hover 시 표시될 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-white text-sm">클릭하여 이미지 변경</span>
          </div>
        </div>
        {/* 숨김 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          onClick={handleImageUpload}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          이미지 저장
        </button>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">이메일</label>
        <p className="text-gray-700">{user?.email}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleNicknameUpdate}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          닉네임 변경
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}

export default MyPage;
