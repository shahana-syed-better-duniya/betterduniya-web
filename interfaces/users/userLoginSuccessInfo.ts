export interface UserLoginSuccessInfo {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  userRole: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiry: string;
  profileImageUri: string;
}
