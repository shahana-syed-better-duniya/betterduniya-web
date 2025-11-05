import { act, renderHook } from '@testing-library/react-native';
import useLoginSave from '../../../hooks/auth/use-login-save';
import { UserLoginSuccessInfo } from '../../../interfaces/users/userLoginSuccessInfo';

// Mock dependencies
jest.mock('../../../utils/user/user-context', () => ({
  useUserContext: jest.fn(() => ({
    setUserContext: jest.fn(),
  })),
}));

jest.mock('../../../utils/auth/storage', () => ({
  saveUserContextToStorage: jest.fn(),
}));

jest.mock('../../../hooks/auth/use-auth-tokens', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onSaveAccessToken: jest.fn(),
    onSaveRefreshToken: jest.fn(),
  })),
}));

const mockSetUserContext = jest.fn();
const mockSaveUserContextToStorage = require('../../../utils/auth/storage').saveUserContextToStorage;
const mockOnSetAccessToken = jest.fn();
const mockOnSetRefreshToken = jest.fn();
const mockOnSetRefreshTokenExpiry = jest.fn();
const mockOnGetAccessToken = jest.fn().mockResolvedValue('mock-saved-token');
const mockOnGetRefreshToken = jest.fn().mockResolvedValue('mock-saved-refresh-token');
const mockOnGetRefreshTokenExpiry = jest.fn().mockResolvedValue('2024-12-31');

require('../../../utils/user/user-context').useUserContext.mockReturnValue({
  setUserContext: mockSetUserContext,
});

require('../../../hooks/auth/use-auth-tokens').default.mockReturnValue({
  onSetAccessToken: mockOnSetAccessToken,
  onSetRefreshToken: mockOnSetRefreshToken,
  onSetRefreshTokenExpiry: mockOnSetRefreshTokenExpiry,
  onGetAccessToken: mockOnGetAccessToken,
  onGetRefreshToken: mockOnGetRefreshToken,
  onGetRefreshTokenExpiry: mockOnGetRefreshTokenExpiry,
});

describe('useLoginSave', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserLoginInfo: UserLoginSuccessInfo = {
    userId: '123',
    userName: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    userRole: 'user',
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    refreshTokenExpiry: '2024-12-31',
    profileImageUri: 'https://example.com/profile.jpg',
  };

  it('should save user login information correctly', async () => {
    const { result } = renderHook(() => useLoginSave());

    await act(async () => {
      await result.current(mockUserLoginInfo);
    });

    // Check if user context was set
    expect(mockSetUserContext).toHaveBeenCalledWith({
      userId: mockUserLoginInfo.userId,
      username: mockUserLoginInfo.userName.toLowerCase(),
      firstName: mockUserLoginInfo.firstName,
      lastName: mockUserLoginInfo.lastName,
      bio: mockUserLoginInfo.bio,
      userRole: mockUserLoginInfo.userRole,
      profileImageUri: mockUserLoginInfo.profileImageUri,
    });

    // Check if tokens were saved
    expect(mockOnSetAccessToken).toHaveBeenCalledWith(mockUserLoginInfo.accessToken);
    expect(mockOnSetRefreshToken).toHaveBeenCalledWith(mockUserLoginInfo.refreshToken);

    // Check if user context was saved to storage
    expect(mockSaveUserContextToStorage).toHaveBeenCalledWith({
      userId: mockUserLoginInfo.userId,
      username: mockUserLoginInfo.userName.toLowerCase(),
      firstName: mockUserLoginInfo.firstName,
      lastName: mockUserLoginInfo.lastName,
      bio: mockUserLoginInfo.bio,
      userRole: mockUserLoginInfo.userRole,
      profileImageUri: mockUserLoginInfo.profileImageUri,
    });
  });

  it('should handle empty user info gracefully', async () => {
    const { result } = renderHook(() => useLoginSave());

    const emptyUserInfo: UserLoginSuccessInfo = {
      userId: '',
      userName: '',
      firstName: '',
      lastName: '',
      bio: '',
      userRole: '',
      accessToken: '',
      refreshToken: '',
      refreshTokenExpiry: '',
      profileImageUri: '',
    };

    await act(async () => {
      await result.current(emptyUserInfo);
    });

    expect(mockSetUserContext).toHaveBeenCalledWith({
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      userRole: '',
      profileImageUri: '',
    });

    // Token functions should not be called for empty values
    expect(mockOnSetAccessToken).not.toHaveBeenCalled();
    expect(mockOnSetRefreshToken).not.toHaveBeenCalled();
  });

  it('should handle errors during save process', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock the storage function to reject before creating the hook
    mockSaveUserContextToStorage.mockImplementation(() => Promise.reject(new Error('Storage error')));

    const { result } = renderHook(() => useLoginSave());

    await act(async () => {
      await result.current(mockUserLoginInfo);
    });

    // Should still set user context even if storage fails
    expect(mockSetUserContext).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to save user context to storage:', expect.any(Error));
    
    consoleSpy.mockRestore();
    // Reset the mock for other tests
    mockSaveUserContextToStorage.mockResolvedValue(undefined);
  });
});