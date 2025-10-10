export interface UserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  provider: string;
}
