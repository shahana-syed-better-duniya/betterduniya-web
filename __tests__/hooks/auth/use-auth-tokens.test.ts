import { act, renderHook } from '@testing-library/react-native';
import useAuthTokens from '../../../hooks/auth/use-auth-tokens';

// Mock Expo SecureStore
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock Platform to test different platforms  
jest.mock('react-native', () => {
  const mockPlatform = {
    OS: 'ios', // Default to iOS for SecureStore
  };
  return {
    Platform: mockPlatform,
  };
});

// Get the mocked Platform for manipulation in tests
const mockPlatform = require('react-native').Platform;

const mockSecureStore = require('expo-secure-store');
const mockAsyncStorage = require('@react-native-async-storage/async-storage');

describe('useAuthTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('iOS/Android (SecureStore)', () => {
    it('should save access token to SecureStore', async () => {
      const { result } = renderHook(() => useAuthTokens());
      const testToken = 'test-access-token';

      await act(async () => {
        await result.current.onSetAccessToken(testToken);
      });

      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith('accessToken', testToken);
    });

    it('should get access token from SecureStore', async () => {
      const testToken = 'stored-access-token';
      mockSecureStore.getItemAsync.mockResolvedValueOnce(testToken);

      const { result } = renderHook(() => useAuthTokens());

      let retrievedToken;
      await act(async () => {
        retrievedToken = await result.current.onGetAccessToken();
      });

      expect(mockSecureStore.getItemAsync).toHaveBeenCalledWith('accessToken');
      expect(retrievedToken).toBe(testToken);
    });

    it('should save refresh token to SecureStore', async () => {
      const { result } = renderHook(() => useAuthTokens());
      const testRefreshToken = 'test-refresh-token';

      await act(async () => {
        await result.current.onSetRefreshToken(testRefreshToken);
      });

      expect(mockSecureStore.setItemAsync).toHaveBeenCalledWith('refreshToken', testRefreshToken);
    });

    it('should get refresh token from SecureStore', async () => {
      const testRefreshToken = 'stored-refresh-token';
      mockSecureStore.getItemAsync.mockResolvedValueOnce(testRefreshToken);

      const { result } = renderHook(() => useAuthTokens());

      let retrievedToken;
      await act(async () => {
        retrievedToken = await result.current.onGetRefreshToken();
      });

      expect(mockSecureStore.getItemAsync).toHaveBeenCalledWith('refreshToken');
      expect(retrievedToken).toBe(testRefreshToken);
    });

    it('should clear tokens from SecureStore', async () => {
      const { result } = renderHook(() => useAuthTokens());

      await act(async () => {
        await result.current.onClearTokens();
      });

      expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith('accessToken');
      expect(mockSecureStore.deleteItemAsync).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('Web (AsyncStorage)', () => {
    beforeAll(() => {
      // Mock Platform for web
      mockPlatform.OS = 'web';
    });

    afterAll(() => {
      // Reset to iOS
      mockPlatform.OS = 'ios';
    });

    it('should save access token to AsyncStorage on web', async () => {
      const { result } = renderHook(() => useAuthTokens());
      const testToken = 'web-access-token';

      await act(async () => {
        await result.current.onSetAccessToken(testToken);
      });

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('accessToken', testToken);
    });

    it('should get access token from AsyncStorage on web', async () => {
      const testToken = 'web-stored-token';
      mockAsyncStorage.getItem.mockResolvedValueOnce(testToken);

      const { result } = renderHook(() => useAuthTokens());

      let retrievedToken;
      await act(async () => {
        retrievedToken = await result.current.onGetAccessToken();
      });

      expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(retrievedToken).toBe(testToken);
    });
  });

  describe('Error handling', () => {
    it('should handle SecureStore errors gracefully', async () => {
      mockSecureStore.getItemAsync.mockRejectedValueOnce(new Error('SecureStore error'));

      const { result } = renderHook(() => useAuthTokens());

      await expect(
        act(async () => {
          await result.current.onGetAccessToken();
        })
      ).rejects.toThrow('SecureStore error');
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      mockPlatform.OS = 'web';
      mockAsyncStorage.getItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

      const { result } = renderHook(() => useAuthTokens());

      await expect(
        act(async () => {
          await result.current.onGetAccessToken();
        })
      ).rejects.toThrow('AsyncStorage error');
    });
  });
});