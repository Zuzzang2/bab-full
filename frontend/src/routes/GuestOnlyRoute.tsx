import { useAuth } from '@/contexts/AuthContext';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export default function GuestOnlyRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  // 로딩 중이면 아무것도 렌더링하지 않음
  if (isLoading) return null;

  // 로그인된 유저라면 /login 접근 차단
  if (user) {
    alert('이미 로그인된 상태입니다.');
    return <Navigate to="/" replace />;
  }

  return children;
}
